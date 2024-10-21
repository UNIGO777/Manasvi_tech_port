import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminCategories = ({ subSubCategories: initialSubSubCategories, subCategories: initialSubCategories, categories: initialCategories }) => {
  const [subSubCategories, setSubSubCategories] = useState(initialSubSubCategories)
  const [subCategories, setSubCategories] = useState(initialSubCategories)
  const [categories, setCategories] = useState(initialCategories)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTable, setSelectedTable] = useState('subCategories') // New state for table selection

  useEffect(() => {
    const filteredSubSubCategories = initialSubSubCategories?.filter(subSubCategory => 
      subSubCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subSubCategory.subcategory?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subSubCategory.subcategory?.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredSubCategories = initialSubCategories?.filter(subCategory => 
      subCategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subCategory.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredCategories = initialCategories?.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setSubSubCategories(filteredSubSubCategories)
    setSubCategories(filteredSubCategories)
    setCategories(filteredCategories)
  }, [searchTerm, initialSubSubCategories, initialSubCategories, initialCategories])

  const deleteSubSubCategory = async (id) => {
    try {
      await axios.delete(` /api/categories/sub-subcategories/${id}`)
      setSubSubCategories(subSubCategories?.filter(subSubCategory => subSubCategory._id !== id))
      alert('Sub-subcategory deleted successfully')
    } catch (error) {
      console.error('Error deleting sub-subcategory:', error)
      alert('Error deleting sub-subcategory')
    }
  }

  const deleteSubCategory = async (id) => {
    try {
      // First, delete all sub-subcategories associated with this subcategory
      const subSubCategoriesToDelete = subSubCategories?.filter(subSubCategory => subSubCategory.subcategory?._id === id);
      await Promise.all(subSubCategoriesToDelete?.map(subSubCategory => axios.delete(` /api/categories/sub-subcategories/${subSubCategory._id}`)));

      // Then, delete the subcategory itself
      await axios.delete(` /api/categories/subcategories/${id}`)
      setSubCategories(subCategories?.filter(subCategory => subCategory._id !== id))
      alert('Subcategory and its sub-subcategories deleted successfully')
    } catch (error) {
      console.error('Error deleting subcategory:', error)
      alert('Error deleting subcategory')
    }
  }

  const deleteCategory = async (id) => {
    try {
      // First, delete all subcategories associated with this category
      const subCategoriesToDelete = subCategories?.filter(subCategory => subCategory.category?._id === id);
      await Promise.all(subCategoriesToDelete?.map(subCategory => deleteSubCategory(subCategory._id)));

      // Then, delete the category itself
      await axios.delete(` /api/categories/categories/${id}`)
      setCategories(categories?.filter(category => category._id !== id))
      alert('Category and its subcategories deleted successfully')
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Error deleting category')
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">Category Management</h1>
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-indigo-600">
          <h2 className="text-3xl font-semibold ">Categories</h2>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 w-64"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <Link to="/admin/add-new-category" className="bg-gradient-to-r text-sm ml-2 lg:text-md from-purple-400 to-indigo-500 text-white bg-primary px-3 py-2 md:px-6 md:py-3 rounded-lg hover:from-purple-500 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Add New Category
            </Link>
          </div>
          <div className="flex mb-6">
            <select 
              value={selectedTable} 
              onChange={(e) => setSelectedTable(e.target.value)} 
              className="ml-4 border rounded-lg p-2 bg-background text-black"
            >
              <option value="subCategories">Sub Categories</option>
              <option value="subSubCategories">Sub-Subcategories</option>
              <option value="categories">Categories</option>
            </select>
          </div>
          {selectedTable === 'subCategories' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Count</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subCategories?.map((subCategory) => (
                    <tr key={subCategory._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 uppercase whitespace-nowrap">{subCategory.name}</td>
                      <td className="px-6 py-4 uppercase whitespace-nowrap">{subCategory.category?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{subCategory.productsCount || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => deleteSubCategory(subCategory._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedTable === 'subSubCategories' && (
            <div className="overflow-x-auto mt-8">
              <h2 className="text-3xl font-semibold mb-4">Sub-Subcategories</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Super Sub category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products Count</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subSubCategories?.map((subSubCategory) => (
                    <tr key={subSubCategory._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 uppercase whitespace-nowrap">{subSubCategory.name}</td>
                      <td className="px-6 py-4 uppercase whitespace-nowrap">{subSubCategory.subcategory?.name || '-'}</td>
                      <td className="px-6 py-4 uppercase whitespace-nowrap">{subSubCategory.subcategory?.category?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{subSubCategory.productsCount || 0}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => deleteSubSubCategory(subSubCategory._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selectedTable === 'categories' && (
            <div className="overflow-x-auto mt-8">
              <h2 className="text-3xl font-semibold mb-4">Categories</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories?.map((category) => (
                    <tr key={category._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 uppercase whitespace-nowrap">{category.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => deleteCategory(category._id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          Delete
                        </button>
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
  )
}

export default AdminCategories
