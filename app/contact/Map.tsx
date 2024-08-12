import React from "react";

export default function Map() {
  return (
    <div className="w-full h-[500px] relative mt-40">
      <iframe
        className="w-full h-full"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.763807518586!2d38.72589177462974!3d8.993868391066096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b877ac0c96325%3A0x2cb79b98d91b798b!2sKelifa%20Sabit%20apartments!5e0!3m2!1sen!2set!4v1721916019632!5m2!1sen!2set"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
