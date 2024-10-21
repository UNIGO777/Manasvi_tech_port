import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminProject = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updateting, setUpdateting] = useState(false);
  const token = document.cookie.split('; ').find(row => row.startsWith('admin_token=')).split('=')[1];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(' /api/projects', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (projectId) => {
    setDeleting(true);
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) {
      setDeleting(false);
      return;
    }
    try {
      await axios.delete(` /api/projects/deleteProject/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Project deleted successfully");
      setProjects(projects?.filter(project => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
    } finally {
      setDeleting(false);
    }
  };

  const filteredProjects = projects?.filter(project =>
    project?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-2 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-12 text-5xl font-bold text-center text-gray-900">Project Management</h1>
      <div className="overflow-hidden transition-all duration-300 bg-white shadow-2xl rounded-2xl hover:shadow-3xl">
        <div className="px-8 py-6 text-white border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-600">
          <h2 className="text-3xl font-semibold ">Project List</h2>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Search projects..."
                className="w-64 py-3 pl-10 pr-4 transition-all duration-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <Link to="/admin/add-new-project" className="px-6 py-3 font-semibold text-white transition-all duration-300 transform bg-black rounded-lg hover:from-green-500 hover:to-blue-300 hover:-translate-y-1 hover:shadow-lg">
              Add P+
            </Link>
          </div>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto min-h-20">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">Image</th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">Category</th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">Actions</th>
                    <th className="px-6 py-4 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">Update</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProjects?.map((project, index) => (
                    <tr key={index} className="transition-colors duration-200 hover:bg-gray-50">
                      <td className="flex justify-center px-6 py-4 whitespace-nowrap">
                        <img src={`/uploads/${project?.mainImage}`} alt={project?.name} className="object-cover w-12 h-12 rounded-full" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-center whitespace-nowrap">{project?.name.substring(0, 20)}...</td>
                      <td className="px-6 py-4 text-center whitespace-nowrap">
                        <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 uppercase bg-green-100 rounded-full">
                          {project?.projectType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                        <button 
                          onClick={() => handleDelete(project._id)} 
                          className="text-red-600 transition-colors duration-200 hover:text-red-900"
                          disabled={deleting}
                        >
                          {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                        
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                        <Link to={`/admin/update-project/${project._id}`} 
                         
                          className="text-green-600 transition-colors duration-200 hover:text-green-900"
                          disabled={updateting}
                        >
                          {updateting ? 'Updateing...' : 'Update'}
                        </Link>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminProject

// Comments:
// 1. The initial code did not handle the loading state, which caused the projects not to appear when loading. Added a loading state to handle this.
// 2. Removed unnecessary state `initialProjects` and combined it with `projects` to simplify the code.
// 3. Moved the filtering logic inside the render method to ensure it always uses the latest state values.
// 4. Added handleDelete function to delete projects and update the state accordingly.
// 5. Added deleting state to handle the loading state when deleting a project.
// 6. Added token to the API calls for authentication.
