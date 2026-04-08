export default function Footer() {
  const columns = [
    { title: 'Product', links: [{ label: 'Features', href: '#features' }, { label: 'How It Works', href: '#how-it-works' }, { label: 'Safety', href: '#safety' }, { label: 'Pricing', href: '#pricing' }] },
    { title: 'Resources', links: [{ label: 'Documentation', href: '#' }, { label: 'API Reference', href: '#' }, { label: 'Status Page', href: '#' }, { label: 'Changelog', href: '#' }] },
    { title: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }, { label: 'Careers', href: '#' }, { label: 'Contact', href: '#' }] },
    { title: 'Legal', links: [{ label: 'Privacy Policy', href: '#' }, { label: 'Terms of Service', href: '#' }, { label: 'Security', href: '#' }, { label: 'DPA', href: '#' }] },
  ]
  return (
    <footer className="bg-surface border-t border-border-light py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-block mb-4" style={{ fontFamily: "'Bitcount', monospace", fontSize: 24, color: '#1E293B', textDecoration: 'none' }}>
              FlowSprite
            </a>
            <p className="text-sm text-text-light leading-relaxed">Salesforce changes in plain English.</p>
          </div>
          {columns.map((col, i) => (
            <div key={i}>
              <h4 className="text-sm font-semibold text-text mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link, j) => (<li key={j}><a href={link.href} className="text-sm text-text-light hover:text-text transition-colors">{link.label}</a></li>))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border-light pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-light">© {new Date().getFullYear()} FlowSprite. All rights reserved.</p>
          <p className="text-xs text-text-light">Built with care for Salesforce teams who deserve better tooling.</p>
        </div>
      </div>
    </footer>
  )
}
