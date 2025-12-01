import React from 'react';

const Instructions: React.FC = () => {
  return (
    <section className="bg-blue-50 p-6 md:p-8 rounded-xl border border-blue-100 mb-8 h-full shadow-sm">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-5 flex items-center uppercase tracking-wide border-b border-blue-200 pb-3">
            <i className="fa-solid fa-book-open mr-3 text-blue-600"></i>
            HƯỚNG DẪN SỬ DỤNG CHATBOT
          </h2>
          
          <div className="space-y-5">
            {/* Step 1 */}
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm border border-blue-200">1</div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm md:text-base">Nhập câu hỏi</h3>
                <p className="text-gray-600 text-sm leading-relaxed mt-1">
                  Gõ thắc mắc của em vào ô chat. Ví dụ: "Thời khóa biểu hôm nay", "Quy định đồng phục thứ 2".
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm border border-blue-200">2</div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm md:text-base">Sử dụng gợi ý</h3>
                <p className="text-gray-600 text-sm leading-relaxed mt-1">
                  Chọn các nút gợi ý có sẵn bên dưới ô nhập liệu để hỏi nhanh các vấn đề thường gặp.
                </p>
              </div>
            </div>

            {/* Step 3 - Special Request */}
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                <i className="fa-solid fa-star text-xs"></i>
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm w-full">
                <h3 className="font-bold text-blue-800 text-sm md:text-base mb-1">
                   Giải đáp 1 vạn câu hỏi
                </h3>
                <p className="text-gray-600 text-sm italic">
                  "Thầy sẽ giải đáp tất cả mọi vấn đề của em, hãy trải lòng nhé!"
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto hidden md:flex justify-center">
            <div className="opacity-80">
                 <i className="fa-solid fa-robot text-8xl text-blue-200"></i>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Instructions;