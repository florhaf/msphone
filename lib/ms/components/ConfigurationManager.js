/**
 * @public
 *
 * @class ConfigurationManager
 *
 * @description The configuration manager handles settings for different contexts.
 *      The context structure is defined in a MetaData configuration.
 *      Settings can be defined for all the different possible contexts.
 *
 * @example i.e. ServiceURL for Environment : Prod, DataSource : WebService
 *
 */

/**
 * @constructor
 *
 * @class ConfigurationManager
 *
 * @description initializes an instance of ConfigurationManager with
 *      configuration information and context and setting changed
 *      callbacks
 *
 * @param {object} configuration
 *      - MetaData {object}
 *      - Settings {object}
 *
 * @param {object} callbacks
 *      - ContextChanged {Function}
 *      - SettingChanged {Function}
 *
 */
function ConfigurationManager (configuration, callbacks)
{
    var _expansionMatcher     = /\$\{[^\$\{\}]+\}/g;
    var _expansionNameMatcher = /[^\$\{\}]+/;
    var _macroMatcher         = /\$\[[^\$\[\]]+\]/g;
    var _macroNameMatcher     = /[^\$\[\]]+/;

    var _contextStructure;
    var _defaultSection;
    var _macros;
    var _metaData;
    var _settings;
    var _sourceSettings;

    var _context    = {};
    var _validators = {};

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description <p>context changed callback method</p>
     *
     * @param {string} context   <p>context that changed</p>
     *
     * @param {object} value     <p>new context value</p>
     *
     * @param {object} oldValue  <p>old context value</p>
     *
     */
    var _contextChanged = function (context, value, oldValue) {};

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description <p>setting changed callback method</p>
     *
     * @param {string} setting   <p>setting that changed</p>
     *
     * @param {object} value     <p>new context value</p>
     *
     * @param {object} oldValue  <p>old context value</p>
     *
     */
    var _settingChanged = function (setting, value, oldValue) {};

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description Asserts that the supported optional callbacks that are
     *      provided are defined as functions
     *
     * @param {object} callbacks
     *      - ContextChanged {Function} (optional)
     *      - SettingChanged {Function} (optional)
     *
     * @throws {string}
     *      '\'ContextChanged\' must be defined as a function', if ContextChanged
     *      is not defined as a function.
     *
     * @throws {string}
     *      '\'SettingChanged\' must be defined as a function', if SettingChanged
     *      is not defined as a function.
     */
    function assertCallbacks (callbacks)
    {
         if (typeof(callbacks) === 'object')
         {
             if (!!callbacks.ContextChanged)
             {
                 if (typeof(callbacks.ContextChanged) !== 'function')
                 {
                     throw '\'ContextChanged\' must be defined as a function';
                 }

                 _contextChanged = callbacks.ContextChanged;
             }

             if (!!callbacks.SettingChanged)
             {
                 if (typeof(callbacks.SettingChanged) !== 'function')
                 {
                     throw '\'SettingChanged\' must be defined as a function';
                 }

                 _settingChanged = callbacks.SettingChanged;
             }
         }
     }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description Asserts that a context object is valid
     *
     * @param {object} context
     *      - Name {string} Descriptive Name of the context
     *      - Valid {string} List of valid context values separated by a \'|\' symbol
     *      - Descriptive {object}
     *      - Context {object} (optional)
     *
     * @example
     *
     *      var context = {
     *          Name : \'Environment\',
     *          Valid : \'Prod|QA|Dev\',
     *          Descriptive : {
     *              Prod : \'Production\',
     *              QA   : \'Quality Assurance\',
     *              Dev  : \'Development\'
     *          },
     *          Context : {
     *              Name : \'DataSource\',
     *              Valid : \'web|json\'
     *          }
     *      };
     *
     * @throws {string}
     *      'Must provide a description \'Name\' for a \'Context\' to define configuration context.', if
     *      a context Name was not provided.
     *
     * @throws {string}
     *      '\'Valid\' context values may not contain any spaces.', if Valid contains spaces
     *
     * @throws {string}
     *      'Must provide a piped list of \'Valid\' values for a \'Context\' to define valid context values.', if
     *      Valid does not contain a list of valid context values separated by a \'|\' symbol.
     *
     * @throws {string}
     *      '\'Descriptive\' must be an object. Type of \'${typeof(context.Descriptive)}\' is not valid.', if
     *      Descriptive definition is not an object.
     */
     function assertContext (context)
     {
        if (typeof(context.Name) !== 'string' || !(/^\w+$/).test(context.Name))
        {
            throw 'Must provide a description \'Name\' for a \'Context\' to define configuration context.';
        }

        if (typeof(context.Valid) !== 'string' || !(/^\w+(\|\w+)*$/).test(context.Valid))
        {
            if (/\s+/.test(context.Valid))
            {
                throw '\'Valid\' context values may not contain any spaces.';
            }

            throw 'Must provide a piped list of \'Valid\' values for a \'Context\' to define valid context values.';
        }

         if (!!context.Descriptive)
         {
             if (typeof(context.Descriptive) !== 'object')
             {
                 throw '\'Descriptive\' must be an object. Type of \'' + typeof(context.Descriptive) + '\' is not valid.';
             }
         }

        if (typeof(context.Context) === 'object')
        {
            assertContext(context.Context);
        }
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description Asserts that the configuration object has the required definitions
     *
     * @param {object} configuration
     *      - MetaData {object}
     *      - Context {object}
     *      - Settings (optional)
     *
     *      defines the context structure used for categorizing
     *      sets of setting values and provides a list of settings
     *
     * @throws {string}
     *      'Must provide a configuration object to initialize an instance of ConfigurationManager', if
     *      a configuration object was not provided
     *
     * @throws {string}
     *      'Must provide a \'MetaData\' object to initialize an instance of ConfigurationManager', if
     *      the configuration object does not have a definition of a MetaData object.
     *
     * @throws {string}
     *      'Must provide \'Context\' object in \'MetaData\' to define configuration context.', if
     *      the MetaData object does not have a definition of a Context object.
     *
     * @throws {string}
     *      '\'Settings\' for a \'Configuration\' must be an object.', if the configuration object
     *      does not have a definition of a Settings object.
     *
     * @throws {string}
     *      '\'Macros\' should only contain function definitions. \'' + macroName + '\' is not a function.',
     *      if \'Macros\' in configuration object have anything but function definitions.
     *
     */
    function assertConfiguration(configuration)
    {
        if (typeof(configuration) !== 'object')
        {
            throw 'Must provide a configuration object to initialize an instance of ConfigurationManager';
        }

        if (typeof(configuration.MetaData) !== 'object')
        {
            throw 'Must provide a \'MetaData\' object to initialize an instance of ConfigurationManager';
        }

        if (typeof(configuration.MetaData.Context) !== 'object')
        {
            throw 'Must provide \'Context\' object in \'MetaData\' to define configuration context.';
        }

        assertContext(configuration.MetaData.Context);

        if (!!configuration.Settings && typeof(configuration.Settings) !== 'object')
        {
            throw '\'Settings\' for a \'Configuration\' must be an object.';
        }

        if (!!configuration.Macros && typeof(configuration.Macros) !== 'object')
        {
            throw '\'Macros\' must be defined as an object.';
        }

        if (!!configuration.Macros)
        {
            for (var macroName in configuration.Macros)
            {
                if (configuration.Macros.hasOwnProperty(macroName))
                {
                    var macro = configuration.Macros[macroName];

                    if (typeof(macro) !== 'function')
                    {
                        throw '\'Macros\' should only contain function definitions. \'' + macroName + '\' is not a function.';
                    }
                }
            }
        }
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description builds an array representing the configuration\'s context structure.
     *      Initializes a list of friendly names for the valid possibilities for the context.
     *      Initializes a context setter and getter logic.
     *
     * @param {object} context object defining the context structure of the
     *      configuration manager
     *
     * @param {Array} structure list defining context structure being extended
     *
     * @throws {string}
     *      '\'${contextName}\' was already defined as a context. Context name should be unique.', if
     *      a sub context does not have a unique name
     *
     * @returns {Array} list of context names defining the context structure
     *
     */
    function buildContext(context, structure)
    {
        if (!!context)
        {
            var contextName = context.Name;

            if (!!structure && structure.contains(contextName))
            {
                throw '\'' + contextName + '\' was already defined as a context. Context name should be unique.';
            }
            else
            {
                structure = structure || [];
            }

            structure.push(contextName);

            _validators[contextName] = new RegExp(context.Valid + '|Any' + contextName);

            var validContext = context.Valid.split('|');

            /**
             * @property {Array} Valid${Context}Settings, values valid for this context
             */
            this.Context['Valid' + contextName + 'Settings'] = validContext;

            /**
             * @property {Array} ${Context}Descriptions, descriptive names for valid context values
             */
            this.Context[contextName + 'Descriptions'] = buildDescriptions(context.Descriptive, contextName, validContext);

            (function (context, me)
            {
                me.Context.__defineGetter__(context, function()
                {
                    return _context[context];
                });

                me.Context.__defineSetter__(context, function(value)
                {
                    if (value === undefined || _validators[context].test(value))
                    {
                        var oldValue = _context[context];

                        if (oldValue !== value)
                        {
                            _context[context] = value;

                            updateSettings.call(me);

                            _contextChanged(context, value, oldValue);
                        }
                    }
                    else
                    {
                        throw '\'' + value + '\' is not a valid \'' + context + '\'!';
                    }
                });
            })(contextName, this);

            return !!context.Context ? buildContext.call(this, context.Context, structure) : structure;
        }

        return [];
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description builds an descriptions object that has friendly more descriptive names
     *      for all the valid values for a given context
     *
     * @param {object} descriptive object containing optional friendly more descriptive
     *      names for all valid values for the given context
     *
     * @param {string} contextName name of context the descriptions are defined for
     *
     * @param {Array} validContextValues list of valid context values
     *
     * @returns {object} an object that contains the friendly more descriptive names for
     *      each valid value for the context
     *
     * @example
     *      {
     *          QA   : \'Quality Assurance\',
     *          Prod : \'Production\'
     *      }
     */
    function buildDescriptions (descriptive, contextName, validContextValues)
    {
        var result = {};

        descriptive = descriptive || {};

        var described = [];

        for (var description in descriptive)
        {
            if (descriptive.hasOwnProperty(description) && validContextValues.contains(description))
            {
                result[description] = descriptive[description] + ' ' + contextName;

                described.push(description);
            }
        }

        for (var index = validContextValues.length - 1; index >= 0; --index)
        {
            var contextValidValue = validContextValues[index];

            if (!described.contains(contextValidValue))
            {
                result[contextValidValue] = contextValidValue + ' ' + contextName;
            }
        }

        return result;
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description creates property getter and setter for a setting
     *
     * @param {string} setting name of setting to create a property for
     */
    function createProperty(setting) {

        this.Settings.__defineGetter__(setting, function()
        {
            return _settings[setting];
        });

        this.Settings.__defineSetter__(setting, function(value)
        {
            var oldValue = _settings[setting];

            if (oldValue !== value)
            {
                _settings[setting] = expandSetting(_settings, value, _macros);

                _settingChanged(setting, value, oldValue);
            }
        });
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description expands expansion values and macros in a setting
     *
     * @param {object} settings     all settings to base expansion upon
     *
     * @param {string} settingValue original setting value
     *
     * @param {object} macros       all macros for macro expansion
     *
     * @returns {string} an expanded version of the original settingValue
     *
     */
    function expandSetting(settings, settingValue, macros)
    {
        var result;
        var valueType = typeof(settingValue);

        if (valueType === 'string')
        {
            result = settingValue.replace(_expansionMatcher, function(capture)
                                          {
                                              var settingName = capture.match(_expansionNameMatcher)[0];

                                              return settings[settingName] || capture;
                                          })
                                 .replace(_macroMatcher, function (capture)
                                          {
                                              var macroArguments = capture.match(_macroNameMatcher)[0].split('|');

                                              var macro = macros[macroArguments[0]];

                                              macroArguments.shift();

                                              return macro ? macro.apply(this, macroArguments) : capture;
                                          });

            if (_expansionMatcher.test(result) || _macroMatcher.test(result))
            {
                result = expandSetting(settings, result, macros);
            }
        }
        else if (valueType === 'object')
        {
            result = settingValue;

            for (var propertyName in settingValue)
            {
                if (settingValue.hasOwnProperty(propertyName))
                {
                    result[propertyName] = expandSetting(settings, settingValue[propertyName], macros);
                }
            }
        }

        return result || settingValue;
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description extracts settings from a specific context and a catch all context
     *
     * @param {object} structureLevel what level of the context structure to extract settings from
     *
     * @param {object} settingsSource source from where the settings are extracted
     *
     * @returns {object} containing all of the settings for the current context at specific structure level
     *
     */
    function extractSettings (structureLevel, settingsSource)
    {
        structureLevel = structureLevel || 0;

        var contextName = _contextStructure[structureLevel];
        var context     = _context[contextName];

        if (structureLevel < _contextStructure.length)
        {
            settingsSource = structureLevel === 0 ? _sourceSettings : settingsSource || {};

            var anySettings = extractSettings.call(this, structureLevel + 1, settingsSource['Any' + contextName] || {});
            var settings    = extractSettings.call(this, structureLevel + 1, settingsSource[context] || {});

            return mergeSettings(settings, anySettings);
        }

        return settingsSource;
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description sets the initializes values of the context structure based on configuration values
     *
     */
    function initializeContexts ()
    {
        for (var index = 0, count = _contextStructure.length; index < count; index++)
        {
            var name = _contextStructure[index];

            this.Context[name] = _metaData[name];
        }
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description merges two sets of settings, giving priority to the primary settings
     *
     * @param {object} primary favored set of settings
     *
     * @param {object} secondary alternate set of settings
     *
     * @returns {object} a new merged set of settings
     *
     */
    function mergeSettings (primary, secondary)
    {
        var result = {};

        for (var primarySettingName in primary)
        {
            result[primarySettingName] = primary[primarySettingName];
        }

        for (var secondarySettingName in secondary)
        {
            if (!result.hasOwnProperty(secondarySettingName))
            {
                result[secondarySettingName] = secondary[secondarySettingName];
            }
        }

        return result;
    }

    /**
     * @private
     *
     * @class ConfigurationManager
     *
     * @description updates the current settings provided by the configuration manager
     *      based on the current context
     *
     */
    function updateSettings()
    {
        _settings = mergeSettings(extractSettings.call(this), _sourceSettings[_defaultSection] || {});

        this.Settings = {};

        for (var setting in _settings)
        {
            if (_settings.hasOwnProperty(setting))
            {
                _settings[setting] = expandSetting(_settings, _settings[setting], _macros);

                createProperty.call(this, setting);
            }
        }
    }

    assertConfiguration(configuration);
    assertCallbacks(callbacks);

    this.Context = {};

    _metaData         = configuration.MetaData;

    _defaultSection   = _metaData.DefaultSection || 'Common';
    _macros           = configuration.Macros || {};
    _sourceSettings   = configuration.Settings || {};

    _contextStructure = buildContext.call(this, _metaData.Context);

    initializeContexts.call(this);

    updateSettings.call(this);
}