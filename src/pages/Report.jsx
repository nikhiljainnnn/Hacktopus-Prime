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
  const [telegramStatus, setTelegramStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [telegramMessage, setTelegramMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const number = 'CS' + Date.now().toString().slice(-8);
    setReportNumber(number);
    
              // Send to Telegram bot
     setTelegramStatus('sending');
     setTelegramMessage('Sending report to Telegram...');
     
     try {
       const telegramData = {
         reportNumber: number,
         incidentType: formData.incidentType,
         description: formData.description,
         financialLoss: formData.financialLoss,
         contact: formData.contact,
         timestamp: new Date().toISOString()
       };

       // You need to replace these with your actual bot token and chat ID
       const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
       const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
       
       if (BOT_TOKEN && CHAT_ID) {
         const message = `🚨 *NEW CYBER CRIME REPORT*\n\n` +
           `📋 *Report Number:* ${number}\n` +
           `🔍 *Incident Type:* ${formData.incidentType}\n` +
           `📝 *Description:* ${formData.description}\n` +
           `💰 *Financial Loss:* ${formData.financialLoss ? '₹' + formData.financialLoss : 'None'}\n` +
           `📞 *Contact:* ${formData.contact}\n` +
           `⏰ *Timestamp:* ${new Date().toLocaleString()}`;

         const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             chat_id: CHAT_ID,
             text: message,
             parse_mode: 'Markdown'
           })
         });

         if (response.ok) {
           const result = await response.json();
           console.log('Telegram response:', result);
           setTelegramStatus('success');
           setTelegramMessage('✅ Report sent to Telegram successfully!');
         } else {
           const errorText = await response.text();
           console.error('Failed to send to Telegram:', response.status, errorText);
           setTelegramStatus('error');
           setTelegramMessage('❌ Failed to send to Telegram. Check console for details.');
         }
       } else {
         console.error('Telegram credentials not configured');
         setTelegramStatus('error');
         setTelegramMessage('❌ Telegram bot not configured. Please check your .env file.');
       }
     } catch (error) {
       console.error('Error sending to Telegram:', error);
       setTelegramStatus('error');
       setTelegramMessage('❌ Error sending to Telegram: ' + error.message);
     }
    
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
          
          {/* Main Success Card */}
          <div className="bg-green-100 border-l-4 border-green-600 p-8 rounded-xl mb-6">
            <h4 className="text-2xl font-bold text-green-600 mb-4">Report Submitted Successfully!</h4>
            <p className="mb-2">Your report number is: <strong className="text-2xl">{reportNumber}</strong></p>
            <p className="mb-4">Please save this number for future reference. You will be contacted within 24 hours.</p>
          </div>

          {/* Telegram Status Card */}
          <div className={`p-6 rounded-xl border-l-4 mb-6 ${
            telegramStatus === 'sending' ? 'bg-blue-50 border-blue-500' :
            telegramStatus === 'success' ? 'bg-green-50 border-green-500' :
            telegramStatus === 'error' ? 'bg-red-50 border-red-500' :
            'bg-gray-50 border-gray-500'
          }`}>
            <div className="flex items-center space-x-3 mb-3">
              {telegramStatus === 'sending' && (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              )}
              {telegramStatus === 'success' && (
                <div className="text-green-600 text-xl">✅</div>
              )}
              {telegramStatus === 'error' && (
                <div className="text-red-600 text-xl">❌</div>
              )}
              <h5 className={`font-semibold text-lg ${
                telegramStatus === 'sending' ? 'text-blue-700' :
                telegramStatus === 'success' ? 'text-green-700' :
                telegramStatus === 'error' ? 'text-red-700' :
                'text-gray-700'
              }`}>
                Telegram Bot Status
              </h5>
            </div>
            
            <p className={`${
              telegramStatus === 'sending' ? 'text-blue-600' :
              telegramStatus === 'success' ? 'text-green-600' :
              telegramStatus === 'error' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {telegramMessage}
            </p>

            {telegramStatus === 'error' && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">To fix this issue:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Check your .env file has VITE_TELEGRAM_BOT_TOKEN</li>
                  <li>• Check your .env file has VITE_TELEGRAM_CHAT_ID</li>
                  <li>• Restart your development server</li>
                  <li>• Ensure your bot is active on Telegram</li>
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all"
              onClick={() => {
                setSubmitted(false);
                setFormData({ incidentType: '', description: '', financialLoss: '', contact: '' });
                setTelegramStatus('idle');
                setTelegramMessage('');
              }}
            >
              Submit Another Report
            </button>
            
            <button 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all"
              onClick={() => {
                setTelegramStatus('idle');
                setTelegramMessage('');
              }}
            >
              Reset Status
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
