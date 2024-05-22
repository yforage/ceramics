import React from "react";

const SocialLinks: React.FC = () => {
  return (
    <div className={`w-full max-lg:border-4 max-lg:border-pink py-4 rounded-xl flex justify-center lg:justify-end lg:text-end`}>
      <div className={`max-lg:w-64 space-y-1`}>
        <span>Моё творчество в соцсетях:</span>
        <div className={`w-full max-lg:flex max-lg:justify-between lg:space-x-6`}>
          <a>Instagram</a>
          <a>Telegram</a>
          <a>VK</a>
        </div>
      </div>
    </div>
  )
}

export default SocialLinks;