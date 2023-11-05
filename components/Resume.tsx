import { useRef } from "react";
import { TUserDetails } from "./Home";

type ResumeProps = {
  userDetails: TUserDetails;
};

const Resume = ({ userDetails }: ResumeProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const userFullName = `${userDetails.firstName} ${userDetails.lastName}`;
  const userImagePath = userDetails.latestUserImage
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/${userDetails.latestUserImage}`
    : undefined;

  const replaceWithBr = (sentence: string) => {
    return sentence.replace(/\n/g, "<br />");
  };

  const handleEmailSubmit = () => {
    console.log("click");
  };

  return (
    <>
      <button
        onClick={handleEmailSubmit}
        className="p-4 pointer outline-none bg-blue-500 border-none text-zinc-100 text-base font-semibold rounded-md mt-2"
      >
        Send Resume in Email
      </button>
      <div className="min-h-screen p-8" ref={componentRef}>
        <header className="w-[80%] my-0 mx-auto min-h-[10vh] bg-slate-600 p-8 rounded-r-sm flex items-center justify-between">
          <div>
            <h1>{userFullName}</h1>
            <p className="opacity-60 mb-4">
              {userDetails.currentPosition} ({userDetails.knownTechnologies})
            </p>
            <p className="opacity-60">
              {userDetails.workingExperience}year(s) work experience
            </p>
          </div>
          {userImagePath ? (
            <div>
              <img
                src={userImagePath}
                alt={userFullName}
                className="align-middle w-36 h-36 rounded-[50%] border-[0.4rem] border-zinc-300"
              />
            </div>
          ) : null}
        </header>
        <div className="w-[80%] my-0 mx-auto p-8 min-h-[80vh] border-2 border-white-400">
          <div>
            <h2 className="mb-2 font-bold text-lg">PROFILE SUMMARY</h2>
            {/* TODO: the text needs to be changed to OpenAI response */}
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(
                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
                ),
              }}
              className="text-justify mb-8"
            />
          </div>
          {userDetails.companies.length > 1 ? (
            <>
              <hr className="my-8 h-2" />
              <div>
                <h2 className="mb-2 font-bold text-lg">WORK HISTORY</h2>
                {userDetails.companies.map((company) => (
                  <p className="text-justify mb-8" key={company.companyName}>
                    <span style={{ fontWeight: "bold" }}>
                      {company.companyName}
                    </span>{" "}
                    - {company.position}
                  </p>
                ))}
              </div>
            </>
          ) : null}
          <hr className="my-8 h-2" />
          <div>
            <h2 className="mb-2 font-bold text-lg">JOB PROFILE</h2>
            {/* TODO: the text needs to be changed to OpenAI response */}
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(
                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
                ),
              }}
              className="text-justify mb-8"
            />
          </div>
          <hr className="my-8 h-2" />
          <div>
            <h2 className="mb-2 font-bold text-lg">JOB RESPONSIBILITIES</h2>
            {/* TODO: the text needs to be changed to OpenAI response */}
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(
                  "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:"
                ),
              }}
              className="text-justify mb-8"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Resume;
