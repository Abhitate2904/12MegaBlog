import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async UpdateAnswers(questionId, userAnswer, answersData) {
    try {
      const question = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwritequestionID,
        questionId
      );

      if (!question) {
        console.log("Question not found");
        return;
      }

      const isCorrect = String(question.CorrectAnswer) === String(userAnswer);
      const score = isCorrect ? 1 : 0;

      const response = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritequestionID,
        questionId,
        {
          Anwsered: userAnswer,
          Result: isCorrect,
          Score: score,
        }
      );
      console.log("Response", question.tests.$id);
      console.log("Response", question.tests.TestID);
      const updateTest = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwritetestID,
        question.tests.$id,
        {
          Status: "Completed",
          summary: answersData,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: UpdateAnswers :: error", error);
    }
  }

  async getTestQuestions() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritequestionID
      );
      return response.documents;
    } catch (error) {
      console.log("Appwrite Service :: getTestQuestions :: error", error);
      return [];
    }
  }

  async GetSubjects() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteSubCollectionId
      );
      console.log("Subjects fetched:", response);
      console.log("Subjects fetched:", response.documents);
      return response.documents; // Return array of documents
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return null;
    }
  }

  async getAllTest() {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritetestCollectionId
      );
      console.log("Test fetched:", response);
      return response.documents;
    } catch (error) {}
  }

  async uploadTestResultFile(file) {
    try {
      console.log("Bucket ID:", conf.appwriteBucketId);
      return await this.bucket.createFile(
        conf.appwriteBucketId, // Your storage bucket ID
        ID.unique(), // Unique file ID
        file
      );
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  }
  
  // file upload service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }

  async saveTestResults(UserID, TestId, fileId) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwritetestresultcollectionID,
        ID.unique(),
        {
          UserID,
          TestId,
          fileId, 
          Status:"Completed"
        }
      );
    } catch (error) {
      console.error("Error saving test results:", error);
    }
  }

  async getTestResultsByUser(userID) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwritetestresultcollectionID,
        [Query.equal("UserID", userID)]
      );
      console.log("Test results fetched:", response );
      return response.documents;
    } catch (error) {
      console.error("Error fetching test results:", error);
      return [];
    }
  }
  
  
}

const service = new Service();
export default service;
