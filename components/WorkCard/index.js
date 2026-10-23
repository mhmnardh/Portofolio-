import React from "react";

const WorkCard = ({ img, name, description, onClick }) => {
  return (
    <div className="rounded-lg p-2 laptop:p-4 first:ml-0 link" onClick={onClick}>
      <div className="relative rounded-lg overflow-hidden shadow-[0_0_250px_40px_rgba(57,27,59,0.32)] dark:shadow-[0_0_250px_40px_rgba(57,27,59,0.45)] transition-all ease-out duration-300 h-48 mob:h-auto" style={{ height: "200px" }}>
        <img alt={name} className="absolute inset-0 w-full h-full object-cover transition-all ease-out duration-300 hover:scale-110" src={img}></img>
      </div>
      <h1 className="mt-5 text-3xl font-medium">{name ? name : "Project Name"}</h1>
      <h2 className="text-xl opacity-50">{description ? description : "Description"}</h2>
    </div>
  );
};

export default WorkCard;
