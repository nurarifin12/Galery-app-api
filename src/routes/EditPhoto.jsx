import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPhoto = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const editPhoto = (e) => {
    e.preventDefault();
    // TODO: answer here
    const requestOption = {
      method: "PATCH",
      headers: { "Content-Type": "aplication/json" },
    };
    fetch(`https://gallery-app-server.vercel.app/photos?id=${id}`, requestOption)
      .then((Response) => Response.json())
      .then((json) => {
        console.log({ json, data: json.id });
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://gallery-app-server.vercel.app/photos?id=${id}`)
      .then((Response) => Response.json())
      .then((json) => {
        setLoading(false);
        navigate("/photos");
        setError("eror");
      });
  }, [id]);

  if (error) return <div>Error!</div>;

  return (
    <>
      {loading ? (
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>Loading...</h1>
      ) : (
        <div className="container">
          <form className="edit-form" onSubmit={editPhoto}>
            <label>
              Image Url:
              <input className="edit-input" type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            </label>
            <label>
              Captions:
              <input className="edit-input" type="text" value={captions} data-testid="captions" onChange={(e) => setCaptions(e.target.value)} />
            </label>
            <input className="submit-btn" type="submit" value="Submit" data-testid="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default EditPhoto;
