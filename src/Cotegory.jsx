import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Cotegory() {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null); // Updated to null
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState([]);
  
    const handleSubmit = () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      formData.append("description", description);
      formData.append("status", status);
  
      axios.post("http://65.0.96.247:8000/categories/save-category", formData)
        .then((res) => {
          console.log('res', res);
          fetchData();
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  
    console.log("image", file);
  
    useEffect(() => {
      fetchData();
    }, []);
    const fetchData = () =>{
      axios.get("http://65.0.96.247:8000/categories/view-category")
        .then((res) => {
          if (res.data.status === true) {
            setData(res.data.Category);
            console.log("Success", res);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
      }
  
    console.log("name", name);
  
    return (
      <div className='Head'>
        <div className='main'>
          <h2>Create Category</h2>
          <div className='fieldData'>
            <label>Title</label>
            <input type="text" placeholder='Please enter TitleName' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='fieldData'>
            <label>Image</label>
            <input type='file' onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className='fieldData'>
            <label>Description</label>
            <input type="text" placeholder='Please enter Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className='fieldDat'>
            <label style={{ marginRight: '20px' }}>ActionType</label>
            <span>Active</span>
            <input type='radio' value="active" name='act' onChange={(e) => setStatus(e.target.value)} />
            <span>Deactive</span>
            <input type='radio' value="deactive" name='act' onChange={(e) => setStatus(e.target.value)} />
          </div>
          <div className='fieldData'>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
        <div>
          <div>
            <select>
              {data &&
                data.map((category) => (
                  <option key={category.id} value={category.id} data-info={JSON.stringify(category)}>
                    {category.name} - {category.status}, {category.description} <img src={category.file} alt={category.name} style={{ width: '50px', height: '50px', borderRadius: '50%'}}/>
                  </option>
                ))}
            </select>
            {/* {data&&data.map((category)=>{
              return (
                <div>
                    {category.name} <img src={category.file} style={{ width: '50px ', height: "200"}}/>
                </div>
              )
            })} */}
          </div>
        </div>
      </div>
    )
  }
  

