const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteSubCollectionId: String(import.meta.env.VITE_APPWRITE_SUBCOLLECTION_ID),
    appwritetestCollectionId: String(import.meta.env.VITE_APPWRITE_TestCOLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwritetestID:String(import.meta.env.VITE_APPWRITE_TestCOLLECTION_ID),
    appwritequestionID:String(import.meta.env.VITE_APPWRITE_QUESTION_COLLECTION_ID),
    appwritetestresultcollectionID:String(import.meta.env.VITE_APPWRITE_TESTRESULT_COLLECTION_ID),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf