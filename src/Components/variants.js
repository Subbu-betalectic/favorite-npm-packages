import { theme } from "@reusejs/react";

const newTheme = {
  ...theme,
  variants: {},
};

const variants = {
  secondary: {
    labelBaseClasses: {
      color: "text-black text-xl",
    },
    buttonBaseClasses: {
      width: "w-32",
      backgroundColor: "bg-blue-500",
      border: "border-0",
      font: "font-semibold text-base rounded text-white",
    },
  },
  primary: {
    labelBaseClasses: {
      color: "text-black text-base",
    },
    textInputBaseClasses: {
      backgroundColor: "bg-white",
      borderRadius: "rounded-md p-2 ",
      textColor: "text-black",
      border: "border border-gray-500",
      focus: "focus:ring-transparent outline-none",
      margin: "mt-2",
    },
    textAreaBaseClasses: {
      backgroundColor: "bg-white",
      width: "w-full",
      borderRadius: "rounded-md",
      border: "border border-gray-500",
      font: "font-normal",
      textColor: "text-black",
    },
    textInputBaseErrorClasses: {
      border: "rounded-md border border-gray-500",
      focus: "",
      textColor: "font-normal text-black",
      backgroundColor: "",
      placeholderColor: "text-black",
    },
  },
  error: {
    labelBaseClasses: {
      color: "text-red-500 text-sm",
    },
  },

  greenButton: {
    buttonBaseClasses: {
      width: "w-32",
      backgroundColor: "bg-green-500",
      border: "border-0",
      font: "font-semibold text-base rounded text-white",
    },
  },
  redButton: {
    buttonBaseClasses: {
      width: "w-32",
      backgroundColor: "bg-red-500",
      border: "border-0",
      font: "font-semibold text-base rounded text-white",
    },
  },
  heading: {
    labelBaseClasses: {
      color: "text-black text-base font-bold",
    },
  },
  subHeading: {
    labelBaseClasses: {
      color: "text-black text-sm font-bold",
    },
  },
};

newTheme["variants"] = variants;

export default newTheme;
