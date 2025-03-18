import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [tests, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const {slug} = useParams()

    useEffect(() => {}, [])
    appwriteService.getAllTest([]).then((tests) => {
        if (posts) {
            setPosts(tests)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {tests.map((test) => (
                    <div key={test.TestID} className='p-2 w-1/4'>
                        <PostCard subjects={test.subjects} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts