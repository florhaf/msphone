Ext.regController('session', {

    _loginUrl           : null,
    _logoutUrl          : null,
    _loginScreen        : null,
    _refreshUrl         : null,
    _idleWarnTimer      : null,
    _sessionWarnTimer   : null,
    _idleTimer          : null,
    _sessionTimer       : null,
    _session            : null,

    load                        : function() {

        this._session = Ext.ModelMgr.create({}, 'session');

        this._initSessionTimeouts();
    },
    login                       : function(routeData) {

        this._loginUrl = this_loginUrl || MSPhone.config.Settings.sessionConfig.loginUrl;

        this._loginScreen.showLoadIndocator();

        try {

            Ext.Ajax.request({
                url     : this._loginUrl,
                method  : 'POST',
                params  : {
                    loginName   : routeData.username,
                    password    : routeData.password
                },
                success : function() {

                    this._loginScreen.hideLoadIndicator();
                    this._loginScreen.destroy();
                    this._setSessionTimers(new Date());
                },
                failure : function(response) {

                    switch (response.status) {
                        case 401:
                            this._redirectToLogin();
                        case 400:
                        case 403:
                        case 407:
                            this._loginScreen.setErrorMsg(MSPhone.config.Settings.loginText.failText);
                        default :
                            Ext.ControllerManager.get('viewport').showError(MSPhone.config.Settings.loginText.problemText);
                    }
                }

            });
        } catch (err) {

            this._loginScreen.hideLoadIndicator();
            Ext.controllerManager.get('viewport').showError(MSPhone.config.Settings.loginText.problemText);
        }
    },
    logout                      : function(force) {

        this._logoutUrl = this._logoutUrl || MSPhone.config.Settings.sessionConfig.logoutUrl;

        try {

            Ext.Ajax.request({
                scope   : this,
                url     : this._logoutUrl,
                method  : 'POST',
                success : function() {

                    this._redirectToLogin();
                },
                failure : function() {

                    if (force) {

                        window.location = this._logoutUrl;
                    }
                    Ext.controllerManager.get('viewport').showError(MSPhone.config.Settings.loginText.logoutProblemText);
                }
            });
        } catch (err) {

            Ext.controllerManager.get('viewport').showError(MSPhone.config.Settings.loginText.problemText);
        }
    },
    _initSessionTimeouts        : function() {

        var initDate = new Date();

        if (document.referrer.search(this._loginUrl || MSPhone.config.Settings.sessionConfig.loginUrl) ||
                Ext.isEmpty(this._session.get('lastIdleTime')) ||
                Ext.isEmpty(this._session.get('sessionStartTime'))) {

            this._session.set('lastIdleTime', initDate.toUTCString());
            this._session.set('sessionStartTime', initDate.toUTCString());
        }

        this._setIdleTimers(new Date(this._session.get('lastIdleTime')));
        this._setSessionTimers(new Date(this._session.get('sessionStartTime')));
    },
    _setIdleTimers              : function(date) {

        if (!(date instanceof(Date))) {

            throw 'must pass in a date';
        }

        this._session.set('lastIdleTime', date.toUTCString());

        this._clearIdleTimers();

        var idleTimeElapsed = new Date() - date;
        var idleTimeLeft = MSPhone.config.Settings.sessionDefault.idleTimeout - idleTimeElapsed;
        var warnIdleTimeLeft = MSPhone.config.Settings.sessionDefault.warnIdleTimeout - idleTimeElapsed;

        if (idleTimeLeft <= 0) {

            this._handleTimeout();
            return;
        }

        if (warnIdleTimeLeft <= 0) {

            this._warnUserOfIdleTimeout();
            return;
        }


        this._idleTimer = Ext.defer(this._handleTimeout, idleTimeLeft, this);

        this._idleWarnTimer = Ext.defer(this._warnUserOfIdleTimeout, warnIdleTimeLeft, this);
    },
    _setSessionTimers           : function(date) {

        if (!(date instanceof(Date))) {

            throw 'must pass in a date';
        }

        this._session.set('sessionStartTime', date.toUTCString());

        this._clearIdleTimers();

        var sessionTimeElapsed = new Date() - date;
        var sessionTimeLeft = MSPhone.config.Settings.sessionDefault.sessionTimeout - sessionTimeElapsed;
        var warnSessionTimeLeft = MSPhone.config.Settings.sessionDefault.warnSessionTimeout - sessionTimeElapsed;

        if (sessionTimeLeft <= 0) {

            this._handleTimeout();
            return;
        }

        if (warnSessionTimeLeft <= 0) {

            this._warnUserOfSessionTimeout();
            return;
        }


        this._sessionTimer = Ext.defer(this._handleTimeout, sessionTimeLeft, this);

        this._sessionWarnTimer = Ext.defer(this._warnUserOfSessionTimeout, warnSessionTimeLeft, this);
    },
    _clearIdleTimers            : function() {

        if (this._idleWarnTimer && this._idleWarnTimer > 0) {

            clearInterval(this._idleWarnTimer);
        }

        if (this._idleTimer && this._idleTimer > 0) {

            clearInterval(this._idleTimer);
        }
    },
    _clearSessionTimers         : function() {

        if (this._sessionWarnTimer && this._sessionWarnTimer > 0) {

            clearInterval(this._sessionWarnTimer);
        }

        if (this._sessionTimer && this._sessionTimer > 0) {

            clearInterval(this._sessionTimer);
        }
    },
    _warnUserOfIdleTimeout      : function() {

        Ext.Msg.alert(MSPhone.config.Settings.sessionText.idleTimeoutTitleText,
                MSPhone.config.Settings.sessionText.idleTimeoutWarnText,
                this._refreshIdleTime,
                this);
    },
    _warnUserOfSessionTimeout   : function() {

        this._loginScreen = Ext.create({
            xtype : 'login'
        }).show();
    },
    _refreshIdleTime            : function(retry) {

        this._refreshUrl = this._refreshUrl || MSPhone.config.Settings.sessionConfig.refreshUrl;

        if (retry == 'no') {

            this.logout();
            return;
        }

        retry = (retry && retry.constructor == Number ? retry : 0) || 0;

        if (retry > 2) {

            Ext.Msg.alert(MSPhone.config.Settings.sessionText.idleTimeoutTitleText,
                    MSPhone.config.Settings.sessionText.idleTimeoutRefreshFailText);
            return;
        }

        Ext.Ajax.request({
            scope   : this,
            url     : this._refreshUrl,
            method  : 'POST',
            success : function() {

                var newIdleTime = new Date();
                this._session.set('lastIdleTime', newIdleTime.toUTCString());
                this._setIdleTimers(newIdleTime);
            },
            failure: function(response) {

                switch (response.status) {

                    case 401:
                    case 403:
                        this._redirectToLogin();
                        break;
                }
                Ext.defer(this._refreshIdleTime, 1000, this, [(retry + 1)]);
            }
        });
    },
    _handleTimeout              : function() {

        this._clearIdleTimers();
        this._clearSessionTimers();
        this.logout(true);
    },
    _redirectToLogin            : function() {

        window.location = this._loginUrl || MSPhone.config.Settings.sessionConfig.loginUrl;
    }
});