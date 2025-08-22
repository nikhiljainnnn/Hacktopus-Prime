import React from 'react'
import { Shield, Mail, Phone, ExternalLink } from 'lucide-react'

const Footer = () => {
  const quickLinks = [
    { name: 'Emergency: 1930', url: 'tel:1930' },
    { name: 'Cyber Crime Portal', url: 'https://cybercrime.gov.in/' },
    { name: 'CERT-IN', url: 'https://www.cert-in.org.in/' },
    { name: 'Digital India', url: 'https://www.digitalindia.gov.in/' },
  ]

  const emergencyContacts = [
    { icon: <Phone className="h-4 w-4" />, text: '1930 - Cyber Crime Helpline' },
    { icon: <Phone className="h-4 w-4" />, text: '100 - Police Emergency' },
    { icon: <Mail className="h-4 w-4" />, text: 'cybercrime.gov.in' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">CyberShield</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering Indians with knowledge and tools to stay safe online. 
              Learn about cyber threats, protect yourself, and help others.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4" />
                <span>support@cybershield.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    <span>{link.name}</span>
                    {link.url.startsWith('http') && (
                      <ExternalLink className="h-3 w-3" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Contacts</h3>
            <ul className="space-y-2 text-gray-300">
              {emergencyContacts.map((contact, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  {contact.icon}
                  <span>{contact.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 CyberShield. All rights reserved. Stay safe online!</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
