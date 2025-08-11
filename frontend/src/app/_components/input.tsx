type InputProps = {
  type:"text"|"email"|"number";
  name:string;
  label:string;
  placeholder:string;
}
export function Input({type, name, label, ...props}:InputProps){
  return(
    <div className="relative w-full">
      <input type={type} name={name} {...props} className="relative z-10 rounded-md peer w-full border-1 border-[#D8D8D8] placeholder:text-transparent p-2 focus:outline-[#007BFF] text-base pt-4 pb-1" placeholder="name" />
      <label htmlFor={name} className="absolute left-0 ml-1 px-1 -translate-y-[-5px]  text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-3 peer-placeholder-shown:text-[14px] peer-placeholder-shown:italic text-[#007BFF] font-bold text-[12px] peer-placeholder-shown:font-normal peer-placeholder-shown:text-gray-500 peer-focus:ml-1 peer-focus:-translate-y-[-5px] peer-focus:px-1 peer-focus:text-[12px] peer-focus:text-[#007BFF] peer-focus:font-bold peer-focus:not-italic">{label}</label>
    </div>
  )
}