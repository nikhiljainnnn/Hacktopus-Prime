import React from 'react';

const Help = () => {
  const helpSections = [
    {
      title: "📞 Emergency Numbers",
      content: [
        { label: "Cyber Crime", value: "1930" },
        { label: "Women Helpline", value: "1091" },
        { label: "Senior Citizens", value: "14567" },
        { label: "Police", value: "100" }
      ]
    },
    {
      title: "🌐 Useful Websites",
      content: [
        { label: "cybercrime.gov.in", value: "Report cyber crimes" },
        { label: "cert-in.org.in", value: "Cyber security alerts" }
      ]
    },
    {
      title: "💡 Quick Tips",
      content: [
        { label: "", value: "Never share OTP with anyone" },
        { label: "", value: "Check website URL before entering details" },
        { label: "", value: "Use strong passwords" },
        { label: "", value: "Keep apps updated" },
        { label: "", value: "Be careful on public WiFi" }
      ]
    },
    {
      title: "📱 Safe Apps",
      content: [
        { label: "Truecaller", value: "Block spam calls" },
        { label: "BHIM UPI", value: "Safe payments" },
        { label: "mAadhaar", value: "Official Aadhaar app" },
        { label: "DigiLocker", value: "Store documents safely" }
      ]
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Get Help</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {helpSections.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:transform hover:-translate-y-2 transition-all border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">{section.title}</h3>
              <div className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <p key={itemIndex} className="text-gray-600">
                    {item.label && <strong>{item.label}:</strong>} {item.value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Help;
