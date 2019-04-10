const registry = {}

function set(name, dependency) {
  registry[name] = dependency
}

function get(name) {
  return registry[name]
}

module.exports = {
  set,
  get
};
