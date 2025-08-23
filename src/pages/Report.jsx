import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react'; // Added missing import

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
  const [loading, setLoading] = useState(false); // Added loading state

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
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Reduced spacing */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Cyber Crime</h1>
          <p className="text-lg text-gray-600">
            Help us track and prevent cyber crimes by reporting incidents you've encountered
          </p>
        </div>

        {/* Report Form - Reduced spacing */}
        <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Incident Type - Reduced spacing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type of Incident *
              </label>
              <select
                name="incidentType"
                value={formData.incidentType}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">Select incident type</option>
                <option value="phishing">Phishing Attack</option>
                <option value="fraud">Online Fraud</option>
                <option value="harassment">Cyber Harassment</option>
                <option value="theft">Data Theft</option>
                <option value="scam">Scam</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Date and Time - Reduced spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Incident *
                </label>
                <input
                  type="date"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Incident
                </label>
                <input
                  type="time"
                  name="incidentTime"
                  value={formData.incidentTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Description - Reduced spacing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description of Incident *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Please provide a detailed description of what happened..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              ></textarea>
            </div>

            {/* Financial Impact - Reduced spacing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Financial Impact (if any)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  name="financialLoss"
                  value={formData.financialLoss}
                  onChange={handleInputChange}
                  placeholder="Amount in ₹"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                </select>
              </div>
            </div>

            {/* Platform and Contact - Reduced spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform/Website
                </label>
                <input
                  type="text"
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  placeholder="e.g., WhatsApp, Facebook, Bank website"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Method Used
                </label>
                <select
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select contact method</option>
                  <option value="phone">Phone Call</option>
                  <option value="sms">SMS</option>
                  <option value="email">Email</option>
                  <option value="social">Social Media</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Location - Reduced spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Your city"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">Select state</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                  <option value="Daman and Diu">Daman and Diu</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                  <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                </select>
              </div>
            </div>

            {/* Evidence and Additional Info - Reduced spacing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Evidence/Additional Information
              </label>
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any screenshots, phone numbers, email addresses, or other evidence you have..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              ></textarea>
            </div>

            {/* Contact Information - Reduced spacing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="reporterName"
                  value={formData.reporterName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Submit Button - Reduced spacing */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2.5 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Submitting Report...</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    <span>Submit Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Emergency Contacts - Reduced spacing */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200 mb-6">
          <h3 className="text-lg font-semibold text-red-900 mb-3">🚨 Emergency Contacts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-600">1930</div>
              <div className="text-sm font-medium text-red-900">Cyber Crime Helpline</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-600">100</div>
              <div className="text-sm font-medium text-red-900">Police Emergency</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-red-200">
              <div className="text-xl font-bold text-red-600">1091</div>
              <div className="text-sm font-medium text-red-900">Women Helpline</div>
            </div>
          </div>
        </div>

        {/* Important Information - Reduced spacing */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">ℹ️ Important Information</h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• All reports are confidential and will be handled by law enforcement</li>
            <li>• Provide as much detail as possible to help with the investigation</li>
            <li>• If you've suffered financial loss, contact your bank immediately</li>
            <li>• Keep any evidence (screenshots, emails, etc.) for investigation</li>
            <li>• You can also report directly at cybercrime.gov.in</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Report;
