/** @returns void */
export default function script() {
  const observer = new IntersectionObserver(onEntries, { threshold: [0.75]})

  function onEntries(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting && 'onvisible' in entry.target.attributes) {
        eval(entry.target.attributes.onvisible.value)
      }
    }
  }

  function walk(f, root) {
    f(root)
    for (const child of root.children)
      walk(f, child)
  }

  function install(element) {
    if ('onvisible' in element.attributes)
      observer.observe(element)
  }

  function main() {
    if (location.hash)
      document.getElementById(location.hash.slice(1))
              ?.scrollIntoView()
    queueMicrotask(() => walk(install, document.body))
  }

  window.onload = main
  window.updateHash = function updateHash(value) {
    location.hash = '#' + value
  }
}
