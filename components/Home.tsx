"use client";

import React, { useState } from "react";

import Loading from "./Loading";
import Companies from "./Companies";
import AddCompanyModal from "./AddCompanyModal";
import axios from "axios";

type TUserDetails = {
  firstName: string;
  lastName: string;
  currentPosition: string;
  workingExperience: number;
  email: string;
  knownTechnologies: string;
  companies: TCompany[];
};

export type TCompany = {
  companyName: string;
  position: string;
  workedYears: string;
  technologies: string;
};

const Home = () => {
  const [userDetails, setUserDetails] = useState<TUserDetails>({
    firstName: "",
    lastName: "",
    currentPosition: "",
    workingExperience: 0,
    email: "",
    knownTechnologies: "",
    companies: [
      {
        companyName: "",
        position: "",
        workedYears: "",
        technologies: "",
      },
    ],
  });
  const [userImage, setUserImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddCompany = (newCompany: TCompany) => {
    if (userDetails) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        companies: [...prevDetails.companies, newCompany],
      }));
    }
  };

  const handleRemoveCompany = (index: number) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      companies: prevDetails.companies.filter((_, i) => i !== index),
    }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (userImage) {
      const payload = new FormData();
      payload.set("userImage", userImage);
      const { data } = await axios.post("/api/file-upload", payload);
    }
    setLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  //👇🏻 Renders the Loading component when you sumit the form.
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center p-7">
      <div className="w-full py-3 bg-slate-500 items-center justify-center flex flex-col rounded-t-lg text-white">
        <h1 className="font-bold text-white text-3xl">Resume Builder</h1>
        <p className="text-gray-300">
          Generate a resume with GPT4 in seconds 🚀
        </p>
      </div>
      <form
        onSubmit={handleFormSubmit}
        method="POST"
        encType="multipart/form-data"
        className="p-4 w-full flex flex-col"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              required
              name="firstName"
              id="firstName"
              placeholder="e.g. John"
              value={userDetails.firstName}
              onChange={handleInputChange}
              className="p-3 rounded-md outline-none border border-gray-200 text-white bg-transparent"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              required
              name="lastName"
              id="lastName"
              placeholder="e.g. Doe"
              value={userDetails.lastName}
              onChange={handleInputChange}
              className="p-3 rounded-md outline-none border border-gray-200 text-white bg-transparent"
            />
          </div>
        </div>
        <hr className="w-full h-1 mt-3" />
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col">
            <label htmlFor="currentPosition">Current Position</label>
            <input
              type="text"
              required
              name="currentPosition"
              id="currentPosition"
              placeholder="e.g. Software Engineer"
              value={userDetails.currentPosition}
              onChange={handleInputChange}
              className="p-3 rounded-md outline-none border border-gray-200 text-white bg-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="workingExperience">
              Work Experience (in years)
            </label>
            <input
              type="number"
              required
              name="workingExperience"
              placeholder="e.g. 2"
              id="workingExperience"
              value={userDetails.workingExperience}
              onChange={handleInputChange}
              className="p-3 rounded-md outline-none border border-gray-200 text-white bg-transparent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="knownTechnologies">Technologies you know?</label>
            <input
              type="text"
              required
              name="knownTechnologies"
              id="knownTechnologies"
              placeholder="e.g. React, Node, TypeScript"
              value={userDetails.knownTechnologies}
              onChange={handleInputChange}
              className="p-3 rounded-md outline-none border border-gray-200 text-white bg-transparent"
            />
          </div>
        </div>
        <hr className="w-full h-1 mt-3" />
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          required
          name="email"
          id="email"
          placeholder="e.g. john.doe@gmail.com"
          value={userDetails.email}
          onChange={handleInputChange}
          className="p-3 rounded-md outline-none border border-gray-200 text-white bg-transparent"
        />
        <hr className="w-full h-1 mt-3" />
        <label htmlFor="photo">Upload your image 😎</label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/x-png,image/jpeg"
          onChange={(e) => e.target.files && setUserImage(e.target.files[0])}
          className="p-3 rounded-md outline-none border border-gray-200 mb-3"
        />
        <AddCompanyModal onAddCompany={handleAddCompany} />
        <Companies
          companies={userDetails.companies}
          onRemoveCompany={handleRemoveCompany}
        />
        <button className="p-4 pointer outline-none bg-blue-500 border-none text-white text-base font-semibold rounded-lg">
          CREATE RESUME
        </button>
      </form>
    </div>
  );
};

export default Home;
