import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { timestamp } from '../../firebase/config'

import './Create.css'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
]

const Create = () => {
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

    const { documents } = useCollection('users')
    const { user } = useAuthContext()
    const history = useHistory()

    const { addDocument, response } = useFirestore('projects')
    const [users, setUsers] = useState([])

    useEffect(() => {
        if(documents) {
            const options = documents.map((user) => {
                return { value: user, label: user.displayName }
            })
            setUsers(options)
        }
    }, [documents])
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        if(!category) {
            setFormError('Please select project category.')
            return 
        }
        if(assignedUsers.length < 1) {
            setFormError('Please assign project.')
            return
        }
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }
        const assignedUsersList = assignedUsers.map(user => {
            return {
                displayName: user.value.displayName,
                photoURL: user.value.photoURL,
                id: user.value.id
            }
        })
        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }
        await addDocument(project)
        if(!response.error) {
            history.push('/')
        }
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input type='text' onChange={(e) => setName(e.target.value)} value={name} required />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea type='text' onChange={(e) => setDetails(e.target.value)} value={details} required />
                </label>
                <label>
                    <span>Set due date:</span>
                    <input type='date' onChange={(e) => setDueDate(e.target.value)} value={dueDate} required />
                </label>
                <label>
                    <span>Project category:</span>
                    <Select options={categories} onChange={(option) => setCategory(option)} />
                </label>
                <label>
                    <span>Assign project to:</span>
                    <Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti />
                </label>               
                <button className='btn'>Add project</button>
                { formError && <p className='error'>{formError}</p> }
            </form>
        </div>
    )
}

export default Create
