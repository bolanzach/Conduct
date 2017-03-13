function ServiceManager () {
	var self = this;
	self.services = {};

	self.register = function (name, service) {
		self.services[name] = service();
	};
}