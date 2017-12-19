define(["require", "exports", "./metaDecorators"], function (require, exports, metaDecorators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Provider = (function () {
        function Provider() {
        }
        /**
         *
         * @param injectableName
         * @param args
         * @param constructor
         */
        Provider.prototype.inject = function (injectableName, args, constructor) {
            var _this = this;
            if (Provider.registered[injectableName] || Provider.injected[injectableName]) {
                return;
            }
            if (this.canInject(args)) {
                this.doInject(constructor, args, injectableName);
                Object.keys(Provider.registered).forEach(function (registeredDependency) {
                    var injectionParams = Provider.registered[registeredDependency];
                    if (_this.canInject(injectionParams.args)) {
                        _this.doInject(injectionParams.constructor, injectionParams.args, injectionParams.name);
                    }
                });
            }
            else {
                Provider.registered[injectableName] = { constructor: constructor, name: injectableName, args: args };
            }
        };
        /**
         *
         * @param injectable
         * @returns {any}
         */
        Provider.get = function (injectable) {
            var dependency = Provider.injected[metaDecorators_1.getConstructorName(injectable)];
            if (dependency) {
                return dependency;
            }
            console.error('No injectable of type ', injectable);
        };
        Provider.prototype.canInject = function (args) {
            return !args.length ? true : args.every(function (arg) { return Provider.injected[arg]; });
        };
        Provider.prototype.doInject = function (clazz, args, name) {
            var dependencies = args.map(function (arg) { return Provider.injected[arg]; });
            //let a = new (Function.prototype.bind.apply(constructor, dependencies));
            //let a = constructor.apply(constructor, dependencies);
            //let a = new (constructor.apply(constructor, dependencies));
            // not quite right. calling the constructor twice
            //Provider.injected[name] = new (clazz.apply(clazz, dependencies));
            Provider.injected[name] = new (Function.bind.apply(clazz, dependencies));
            delete Provider.registered[name];
        };
        return Provider;
    }());
    Provider.registered = {}; // Registered but not all dependencies resolved
    Provider.injected = {}; // Registered and all dependencies resolved
    exports.Provider = Provider;
});
