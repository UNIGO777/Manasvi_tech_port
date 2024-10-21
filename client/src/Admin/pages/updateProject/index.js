import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateProject = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    name: '',
    projectType: '',
    mainImage: '',
    description: '',
    clientName: '',
    projectLink: '',
    githubRepo: '',
    technologies: [],
    startDate: '',
    endDate: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const token = document.cookie.split('; ').find(row => row.startsWith('admin_token=')).split('=')[1];

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProject((prev) => ({
      ...prev,
      mainImage: e.target.files[0],
    }));
  };

  const handleTechnologiesChange = (e) => {
    const techList = e.target.value.split(',');
    setProject((prev) => ({
      ...prev,
      technologies: techList,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append('name', project.name);
    formData.append('projectType', project.projectType);
    formData.append('description', project.description);
    formData.append('clientName', project.clientName);
    formData.append('projectLink', project.projectLink);
    formData.append('githubRepo', project.githubRepo);
    formData.append('technologies', project.technologies.join(','));
    formData.append('startDate', project.startDate);
    formData.append('endDate', project.endDate);
    if (project.mainImage instanceof File) {
      formData.append('mainImage', project.mainImage);
    }

    try {
      await axios.put(`/api/projects/updateProject/${projectId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Project updated successfully');
      navigate('/admin');
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading project details...</div>;
  }

  return (
    <div className="max-w-4xl px-2 py-12 mx-auto sm:px-6 lg:px-8">
      <h1 className="mb-12 text-4xl font-bold text-center text-gray-900">Update Project</h1>
      <form onSubmit={handleUpdate} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
            Project Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={project.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Add similar inputs for other fields as needed */}
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        >
          {updating ? 'Updating...' : 'Update Project'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProject;
