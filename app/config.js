MSPhone.config = (function() {

    var config = {

        MetaData : {
            Context : {
                Name    : 'Environment',
                Valid   : 'Prod|QA|Dev',
                Descriptive : {
                    Prod    : 'Production',
                    QA      : 'Quality Assurance',
                    Dev     : 'Development'
                },
                Context     : {
                    Name    : 'DataSource',
                    Valid   : 'web|json',
                    Descriptive : {
                        web     : 'Web Service',
                        json    : 'JSON'
                    }
                }
            },
            Environment : 'Dev',
            DataSource  : 'json'
        },
        Settings : {
            Common : {
                sessionConfig : {
                    loginUrl    : '/public/login/webapp/employeelink/',
                    logoutUrl   : '/public/login/webapp/employeelink/logout',
                    refreshUrl  : '/MSPhone/app/status'
                },
                loginText : {
                    failText : 'Invalid username or Pin+Secure ID / SoftID please try again.',
                    infoText : 'If you have problems or questions about using this system, contact the Remote Computing Help Desk at:' +
                            '<br /><div>' +
                                '<div><span>Americas (GWMG):</span>10866-401-8324 (Select Option 3)</div>' +
                            '</div>',
                    sessionTimeoutWarnText  : 'For security reasons, you will be automatically logged out in the next 5 minutes unless you re-enter your credentials below.',
                    problemText             : 'Could not send the request at this time, please try again.',
                    logoutProblemText       : 'Could not logout at this time, please try again.'
                },
                sessionText : {
                    idleTimeoutTitleText        : 'Session about to expire',
                    idleTimeoutWarnText         : 'Your session has been inactive, tap OK to remain logged in.',
                    idleTimeoutRefreshFailText  : 'Problem with network connectivity, please check your network connection.'
                },
                sessionDefault : {
                    warnSessionTimeout  : (55 * 60 * 1000),
                    sessionTimeout      : (60 * 60 * 1000),
                    warnIdleTimeout     : (13 * 60 * 1000),
                    idleTimeout         : (15 * 60 * 1000)
                },
                keyType : {
                    number 	: 'number',
                    call 	: 'call',
                    add 	: 'add',
                    del 	: 'del'
                }

            },
            Prod : {
                json : {

                }
            },
            AnyEnvironment : {
                json : {
                    contactStore : {
                        local : {
                            model    : 'contact',
                            id       : 'contacts',
                            sorters  : 'last_name',
                            getGroupString : function(record) {

                                return record.get('last_name')[0];
                            }
                        },
                        remote : {
                            exchange : {
                                model    : 'contact',
                                url      : '/sencha/msphone/test/fixture/dummy-contacts.json',
                                root     : 'results',
                                sorters  : 'last_name',
                                getGroupString : function(record) {

                                    return record.get('last_name')[0];
                                }
                            },
                            directory : {
                                model    : 'contact',
                                url      : '/sencha/msphone/test/fixture/dummy-contacts-fwd.json',
                                root     : 'results',
                                sorters  : 'last_name',
                                getGroupString : function(record) {

                                    return record.get('last_name')[0];
                                }
                            },
                            crm : {

                            }
                        }
                    },
                    detailStore : {
                        local : {

                        },
                        remote : {

                        }
                    },
                    keypadStore : {
                        local : {

                        },
                        remote : {
                            model   : 'call',
                            url     : '/sencha/msphone/test/fixture/dummy-call.json',
                            root    : 'text'
                        }
                    },
                    optionStore : {
                        local : {

                        },
                        remote : {
                            model   : 'options',
                            url     : '/sencha/msphone/test/fixture/dummy-options.json',
                            root    : 'results'
                        }
                    },
                    recentStore : {
                        local : {
                            model   : 'recent',
                            id      : 'recents'
                        },
                        remote : {

                        }
                    },
                    sessionStore : {
                        local : {
                            model   : 'session',
                            id      : 'session'
                        },
                        remote : {

                        }
                    }
                }
            }
        }
    };

    return new ConfigurationManager(config, undefined);
})();