import React, { useState } from 'react';

const Report = () => {
  const [formData, setFormData] = useState({
    incidentType: '',
    description: '',
    financialLoss: '',
    contact: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const number = 'CS' + Date.now().toString().slice(-8);
    setReportNumber(number);
    setSubmitted(true);
  };

  const incidentTypes = [
    { value: 'fake-call', label: 'Fake OTP/Bank call' },
    { value: 'payment-fraud', label: 'Payment fraud' },
    { value: 'fake-message', label: 'Suspicious SMS/Email' },
    { value: 'social-media', label: 'Social media fraud' },
    { value: 'shopping-fraud', label: 'Online shopping fraud' },
    { value: 'other', label: 'Other' }
  ];

  if (submitted) {
    return (
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Report Submitted!</h2>
          <div className="bg-green-100 border-l-4 border-green-600 p-8 rounded-xl">
            <h4 className="text-2xl font-bold text-green-600 mb-4">Report Submitted Successfully!</h4>
            <p className="mb-2">Your report number is: <strong className="text-2xl">{reportNumber}</strong></p>
            <p className="mb-4">Please save this number for future reference. You will be contacted within 24 hours.</p>
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => {
                setSubmitted(false);
                setFormData({ incidentType: '', description: '', financialLoss: '', contact: '' });
              }}
            >
              Submit Another Report
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Report Cyber Crime</h2>
        
        <div className="bg-yellow-100 border-l-4 border-yellow-600 p-6 rounded-xl mb-8">
          <strong>Immediate Threat?</strong> Call 1930 right now or visit nearest police station!
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-blue-600 font-semibold mb-2">What happened?</label>
              <select 
                name="incidentType"
                value={formData.incidentType}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none"
                required
              >
                <option value="">Select type</option>
                {incidentTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-blue-600 font-semibold mb-2">Describe what happened</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none"
                rows="4" 
                placeholder="Tell us what happened..." 
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-blue-600 font-semibold mb-2">Money lost (if any)</label>
              <input 
                type="number" 
                name="financialLoss"
                value={formData.financialLoss}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none"
                placeholder="Amount in ₹"
              />
            </div>

            <div className="mb-8">
              <label className="block text-blue-600 font-semibold mb-2">Your phone or email</label>
              <input 
                type="text" 
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 outline-none"
                placeholder="Your contact" 
                required
              />
            </div>

            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Report;
