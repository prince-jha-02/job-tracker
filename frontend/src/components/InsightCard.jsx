function InsightCard({

  icon,

  title,

  value,

}) {

  return (

    <div
      className="
      bg-linear-to-br
      from-white
      to-gray-50
      rounded-2xl
      shadow-md
      hover:shadow-xl
      transition
      duration-300
      p-6
      border
      border-gray-100
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
          h-14
          w-14
          rounded-full
          bg-blue-100
          flex
          items-center
          justify-center
          text-blue-600
          "
        >

          {icon}

        </div>

        <div>

          <p
            className="
            text-gray-500
            text-sm
            font-medium
            "
          >

            {title}

          </p>

          <h2
            className="
            text-xl
            font-bold
            mt-1
            wrap-break-word
            "
          >

            {value || "N/A"}

          </h2>

        </div>

      </div>

    </div>

  );

}

export default InsightCard;