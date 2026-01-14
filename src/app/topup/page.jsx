"use client"

import React, { useState } from 'react';
import { CreditCard, HelpCircle, CheckCircle, AlertCircle, Search } from 'lucide-react';
import { apiList, callPost } from '@/axios/api';

const PhysicalSimTopup = () => {
  const [snNumber, setSnNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, data: '1GB', days: 7, price: 5000, popular: false },
    { id: 2, data: '3GB', days: 15, price: 12000, popular: true },
    { id: 3, data: '5GB', days: 30, price: 20000, popular: false },
    { id: 4, data: '10GB', days: 30, price: 35000, popular: false },
  ];

  const validateSN = (value) => {
    // Basic validation: 19-20 digits (adjust based on your SIM format)
    const isValidFormat = /^\d{19,20}$/.test(value.replace(/\s/g, ''));
    setIsValid(isValidFormat);
    return isValidFormat;
  };

  const handleSnChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setSnNumber(value);
    if (value.length >= 19) {
      validateSN(value);
    } else {
      setIsValid(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid && selectedPlan) {
      alert(`SN: ${snNumber}\nБагц: ${selectedPlan.data} - ${selectedPlan.days} хоног\nҮнэ: ₮${selectedPlan.price.toLocaleString()}`);
      // Add your API call here

    //   callPost(`${apiList.ubsim}`)
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Биет SIM цэнэглэх
          </h1>
          <p className="text-gray-600">
            SIM картын SN дугаараа оруулж дата багц цэнэглэнэ үү
          </p>
        </div>

        {/* Instructions Section
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center justify-between w-full text-left"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                SN дугаар хаанаас олох вэ?
              </h2>
            </div>
            <span className="text-gray-400">
              {showInstructions ? '▲' : '▼'}
            </span>
          </button>

          {showInstructions && (
            <div className="mt-6 space-y-6">
              Visual Guide
              <div className="grid md:grid-cols-2 gap-6">
                SIM Card Front
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">1. SIM картын ар тал</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center relative">
                      <div className="absolute top-4 left-4 text-xs text-gray-600">
                        <div className="bg-white p-2 rounded shadow-sm">
                          <p className="font-mono font-bold">SN: 8999 1234 5678 9012 345</p>
                          <p className="text-[10px] text-gray-500 mt-1">19-20 оронтой тоо</p>
                        </div>
                      </div>
                      <CreditCard className="w-20 h-20 text-purple-300" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    SIM картын ар талд "SN:" эсвэл "Serial Number:" гэсэн бичиг байна
                  </p>
                </div>

                SIM Package
                <div className="space-y-3">
                  <h3 className="font-medium text-gray-900">2. SIM багц дээр</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center relative">
                      <div className="absolute bottom-4 right-4 text-xs text-gray-600">
                        <div className="bg-white p-2 rounded shadow-sm">
                          <p className="font-mono font-bold">SN: 8999 1234 5678 9012 345</p>
                          <p className="text-[10px] text-gray-500 mt-1">Хуучин багц хадгална уу</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-24 bg-white rounded shadow-lg mx-auto mb-2" />
                        <p className="text-sm text-gray-600">SIM багц</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Хэрэв SIM картаа гээсэн бол багц дээрээс SN дугаараа олоорой
                  </p>
                </div>
              </div>

              Important Notes
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="space-y-2 text-sm text-blue-900">
                    <p className="font-medium">Анхаарах зүйлс:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      <li>SN дугаар нь 19-20 оронтой тоо байна</li>
                      <li>Зайг оруулах шаардлагагүй</li>
                      <li>Томоор эсвэл жижгээр бичсэн нөлүүлэхгүй</li>
                      <li>Картын ард эсвэл багц дээрээс олох боломжтой</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}

        {/* SN Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SN Number Input */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              SN дугаар оруулах *
            </label>
            <div className="relative">
              <input
                type="text"
                value={snNumber}
                onChange={handleSnChange}
                placeholder="8999123456789012345"
                maxLength="20"
                className={`w-full px-4 py-3 pr-10 border-2 rounded-lg font-mono text-lg focus:outline-none transition-colors ${
                  isValid === true
                    ? 'border-green-500 focus:border-green-600'
                    : isValid === false
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-300 focus:border-purple-500'
                }`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValid === true && <CheckCircle className="w-5 h-5 text-green-500" />}
                {isValid === false && <AlertCircle className="w-5 h-5 text-red-500" />}
                {isValid === null && <Search className="w-5 h-5 text-gray-400" />}
              </div>
            </div>
            {isValid === false && (
              <p className="mt-2 text-sm text-red-600">
                SN дугаар буруу байна. 19-20 оронтой тоо оруулна уу.
              </p>
            )}
            {isValid === true && (
              <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                SN дугаар зөв байна
              </p>
            )}
            <p className="mt-2 text-xs text-gray-500">
              {snNumber.length}/20 тэмдэгт
            </p>
          </div>

          {/* Plan Selection
          {isValid && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Багц сонгох *
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                      selectedPlan?.id === plan.id
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        Эрэлттэй
                      </div>
                    )}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">{plan.data}</p>
                      <p className="text-sm text-gray-600 mt-1">{plan.days} хоног</p>
                      <p className="text-lg font-semibold text-purple-600 mt-2">
                        ₮{plan.price.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          Submit Button */}
          {isValid && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Нийт дүн:</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {selectedPlan.data} - {selectedPlan.days} хоног
                  </span>
                  <span className="text-2xl font-bold text-red-400">
                    ₮{selectedPlan.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-lg"
              >
                Цэнэглэх
              </button>
            </div>
          )}
        </form>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Тусламж хэрэгтэй юу?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>📞 Утас: +976 9514 1452</p>
            {/* <p>✉️ И-мэйл: support@example.com</p> */}
            {/* <p>💬 Чат: Баруун доод буланд дарж чат нээнэ үү</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicalSimTopup;