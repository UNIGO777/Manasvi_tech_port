import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProject = ({ UpdateProject }) => {
  const navigate = useNavigate();
  const token = document.cookie.split('; ').find(row => row.startsWith('admin_token=')).split('=')[1];
  if (!UpdateProject) navigate('/admin/projects');
  const projectId = UpdateProject?._id;

  const [projectData, setProjectData] = useState({
    name: UpdateProject?.name || '',
    description: UpdateProject?.description || '',
    demoLink: UpdateProject?.demoLink || '',
    keyFeatures: UpdateProject?.keyFeatures || [
      { title: '', description: '' },
      { title: '', description: '' },
    ],
    images: [],
    mainImage: '',
    subMainImage: '',
    techStacks: UpdateProject?.techStacks || [],
    outcome: UpdateProject?.outcome || '',
    clientReview: UpdateProject?.clientReview || '',
    projectStatus: UpdateProject?.projectStatus || 'ongoing',
    projectType: UpdateProject?.projectType || 'product',
  });

  const [imagePreview, setImagePreview] = useState({
    mainImage: '',
    subMainImage: '',
    images: [],
    demoVideo: '',
  });

  const [updating, setUpdating] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleKeyFeatureChange = (index, e) => {
    const { name, value } = e.target;
    const newKeyFeatures = [...projectData?.keyFeatures];
    newKeyFeatures[index][name] = value;
    setProjectData({
      ...projectData,
      keyFeatures: newKeyFeatures,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProjectData({
      ...projectData,
      [name]: files,
    });
    if (files?.length > 0) {
      if (name === 'images') {
        const fileArray = Array.from(files)?.map((file) =>
          URL.createObjectURL(file)
        );
        setImagePreview({
          ...imagePreview,
          images: fileArray,
        });
      } else if (name === 'demoVideo') {
        setImagePreview({
          ...imagePreview,
          demoVideo: URL.createObjectURL(files[0]),
        });
      } else if (name === 'mainImage') {
        setImagePreview({
          ...imagePreview,
          mainImage: URL.createObjectURL(files[0]),
        });
      } else if (name === 'subMainImage') {
        setImagePreview({
          ...imagePreview,
          subMainImage: URL.createObjectURL(files[0]),
        });
      }
    }
  };

  const handleAddKeyFeature = () => {
    if (projectData?.keyFeatures?.length < 5) {
      setProjectData({
        ...projectData,
        keyFeatures: [
          ...projectData?.keyFeatures,
          { title: '', description: '' },
        ],
      });
    }
  };

  const handleRemoveKeyFeature = (index) => {
    if (projectData?.keyFeatures?.length > 2) {
      const newKeyFeatures = projectData?.keyFeatures?.filter(
        (_, i) => i !== index
      );
      setProjectData({
        ...projectData,
        keyFeatures: newKeyFeatures,
      });
    }
  };

  const handleAddTechStack = (techStack) => {
    setProjectData({
      ...projectData,
      techStacks: [...projectData?.techStacks, techStack],
    });
  };

  const handleRemoveTechStack = (index) => {
    const techStacksArray = [...projectData?.techStacks];
    techStacksArray.splice(index, 1);
    setProjectData({
      ...projectData,
      techStacks: techStacksArray,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    Object.keys(projectData).forEach((key) => {
      if (projectData[key] !== UpdateProject[key]) {
        if (key === 'keyFeatures' || key === 'techStacks') {
          formData.append(key, JSON.stringify(projectData[key]));
        } else if (projectData[key] instanceof FileList) {
          if (projectData[key].length > 0) {
            for (let i = 0; i < projectData[key].length; i++) {
              formData.append(key, projectData[key][i]);
            }
          }
        } else {
          formData.append(key, projectData[key]);
        }
      }
    });

    // console.log('Form Data:');
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    try {
      await axios.put(`/api/projects/updateProject/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Project updated successfully');
      navigate('/admin');
    } catch (error) {
      if (error?.response && error?.response?.status === 500) {
        toast.error(error.response.data.message);
        if (error.response.data.message === 'invalid token') {
          document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          navigate('/admin/login');
        }
        console.log(error)
        
      } else {
        toast.error( error.response.data.message);
        console.log(error.response.data.message)
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
        Update Project
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project Name
            </label>
            <input
              type="text"
              name="name"
              value={projectData?.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="demoLink"
            >
              Demo Link
            </label>
            <input
              type="text"
              name="demoLink"
              value={projectData?.demoLink}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            value={projectData?.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="techStacks"
          >
            Tech Stacks (separate by commas)
          </label>
          <input
            type="text"
            name="techStacks"
            value={projectData?.techStacks?.join(',')}
            onChange={(e) =>
              setProjectData({
                ...projectData,
                techStacks: e.target.value.split(','),
              })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="mt-2 flex flex-wrap">
            {projectData?.techStacks?.map((stack, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 rounded-full px-3 py-1 mr-2 mb-2"
              >
                <span className="text-gray-700">{stack}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveTechStack(index)}
                  className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="outcome"
          >
            Outcome
          </label>
          <input
            type="text"
            name="outcome"
            value={projectData?.outcome}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="clientReview"
          >
            Client Review
          </label>
          <textarea
            name="clientReview"
            value={projectData?.clientReview}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="projectStatus"
          >
            Project Status
          </label>
          <select
            name="projectStatus"
            value={projectData?.projectStatus}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="projectType"
          >
            Project Type
          </label>
          <select
            name="projectType"
            value={projectData?.projectType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
        </div>
        {projectData?.keyFeatures?.map((feature, index) => (
          <div key={index} className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`keyFeatureTitle${index}`}
            >
              Key Feature {index + 1} Title
            </label>
            <input
              type="text"
              name="title"
              value={feature?.title}
              onChange={(e) => handleKeyFeatureChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`keyFeatureDescription${index}`}
            >
              Key Feature {index + 1} Description
            </label>
            <textarea
              name="description"
              value={feature?.description}
              onChange={(e) => handleKeyFeatureChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            {projectData?.keyFeatures?.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveKeyFeature(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              >
                Remove Key Feature
              </button>
            )}
          </div>
        ))}
        {projectData?.keyFeatures?.length < 5 && (
          <button
            type="button"
            onClick={handleAddKeyFeature}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Add Key Feature
          </button>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="demoVideo"
          >
            Demo Video
          </label>
          <input
            type="file"
            name="demoVideo"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {imagePreview?.demoVideo && (
            <video
              src={imagePreview?.demoVideo}
              controls
              className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mainImage"
            >
              Main Image
            </label>
            <input
              type="file"
              name="mainImage"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {imagePreview?.mainImage && (
              <img
                src={imagePreview?.mainImage}
                alt="Main Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subMainImage"
            >
              Sub Main Image
            </label>
            <input
              type="file"
              name="subMainImage"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {imagePreview?.subMainImage && (
              <img
                src={imagePreview?.subMainImage}
                alt="Sub Main Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="images"
          >
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            multiple
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <div className="mt-2 flex flex-wrap">
            {imagePreview?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image Preview ${index + 1}`}
                className="w-32 h-32 object-cover mr-2 mb-2 rounded-lg shadow-md"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          >
            {updating ? 'Updating...' : 'Update Project'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateProject;
