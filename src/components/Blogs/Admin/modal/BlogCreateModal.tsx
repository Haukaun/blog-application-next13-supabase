import { useSession } from "next-auth/react";
import React, { useState } from "react";

export const BlogModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data: session } = useSession();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch("/api/blogPost/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: ` ${session?.user.accessToken}`,
      },
      body: JSON.stringify({
        title,
        subTitle,
        content,
        userId: session?.user.id,
        image: "/testimage.jpeg",
      }),
    });

    if (response.ok) {
      // handle success
    } else {
      // handle error
    }
  };

  return (
    <div>
      <label
        htmlFor="my_modal_6"
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
      >
        Create new blogpost
      </label>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex flex-col">
          <div className="flex flex-col">
            <h3 className="font-bold text-lg pb-5 underline">
              Create a Blog Post
            </h3>
            <div className="gap-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full"
              >
                <label>
                  Blog Title:
                  <input
                    type="text"
                    name="title"
                    required
                    className="border-2 rounded-md p-2 mt-2 w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>
                <label>
                  Blog sub-title:
                  <input
                    type="text"
                    name="subTitle"
                    required
                    className="border-2 rounded-md p-2 mt-2 w-full"
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)}
                  />
                </label>
                <label>
                  Blog Content:
                  <textarea
                    name="content"
                    required
                    className="border-2 rounded-md p-2 mt-2 w-full h-40"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </label>
                <input type="submit" value="Submit" className="btn" />
              </form>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
