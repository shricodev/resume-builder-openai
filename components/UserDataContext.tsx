"use client";

import { createContext, useContext, useState } from "react";
import { TUserDetails } from "./Home";

const UserDataContext = createContext<TUserDataContext | null>(null);

type TUserDataContext = {
  userDetails: TUserDetails;
  setUserDetails: React.Dispatch<React.SetStateAction<TUserDetails>>;
  userEvent: EventType;
  setUserEvent: React.Dispatch<React.SetStateAction<EventType>>;
};

export type EventType = {
  profileSummaryEventId: string;
  jobResponsibilitiesEventId: string;
  workHistoryEventId: string;
};

export default function UserDataContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDetails, setUserDetails] = useState<TUserDetails>({
    firstName: "",
    lastName: "",
    currentPosition: "",
    workingExperience: 1,
    email: "",
    knownTechnologies: "",
    latestUserImage: null,
    pdfUrl: null,
    companies: [
      {
        companyName: "",
        position: "",
        workedYears: "",
        technologies: "",
      },
    ],
  });
  const [userEvent, setUserEvent] = useState<EventType>({
    profileSummaryEventId: "",
    jobResponsibilitiesEventId: "",
    workHistoryEventId: "",
  });

  return (
    <UserDataContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userEvent,
        setUserEvent,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error(
      "useUserDataContext must be used within a UserDataProvider"
    );
  }
  return context;
}
