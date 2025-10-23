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

  function main() {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))
              ?.scrollIntoView();
    }
    document.querySelectorAll('*[onvisible]')
            .forEach(x => observer.observe(x))
  }

  window.onload = main
  window.updateHash = function updateHash(value) {
    location.hash = '#' + value
  }
}
