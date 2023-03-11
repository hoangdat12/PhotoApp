import _User from '../models/userModal.js';
import fs from 'fs';
import {
  getInforUserService,
  searchUserByNameService,
  addFollwingService,
  removeFollwingService,
  addCollectionService,
  removeCollectionService,
  updateInforUserService,
  checkFollowingService,
} from '../services/userService.js';

// Profile 64
const getInforUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { code, message, result } = await getInforUserService(userId);

    res.status(code).json({
      message,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error server!' });
  }
};

const searchUserByName = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const searchInput = req.query.search || '';
    const search = searchInput?.toLowerCase();

    const { code, message, result } = await searchUserByNameService(
      page,
      limit,
      search
    );

    res.status(code).json({
      message,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Server Error!' });
  }
};

const addFollwing = async (req, res) => {
  try {
    const { userId, follwingId, avatarUrl, name, occupation } = req.body;

    const { code, message, result } = await addFollwingService(
      userId,
      follwingId,
      avatarUrl,
      name,
      occupation
    );

    res.status(code).json({
      message,
      result,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const removeFollwing = async (req, res) => {
  try {
    const { userId, follwingId } = req.body;

    const { code, message } = await removeFollwingService(userId, follwingId);

    res.status(code).json(message);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const checkFollowing = async (req, res) => {
  try {
    const { userId, follwingId } = req.body;

    const { code, message, result } = await checkFollowingService(
      userId,
      follwingId
    );

    res.status(code).json({
      message,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

const addCollection = async (req, res) => {
  try {
    const { userId, pictureId, pictureUrl, author, type } = req.body;

    const { code, message, result } = await addCollectionService(
      userId,
      pictureId,
      pictureUrl,
      author,
      type
    );

    res.status(code).json({
      message,
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
};

const removeCollection = async (req, res) => {
  try {
    const { userId, pictureId } = req.body;

    const { code, message } = await removeCollectionService(userId, pictureId);

    res.status(code).json(message);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const changeInforUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      firstName,
      lastName,
      email,
      nickName,
      occupation,
      location,
      fileName,
    } = req.body;

    const { code, message, result } = await updateInforUserService(
      userId,
      firstName,
      lastName,
      email,
      nickName,
      occupation,
      location,
      fileName
    );

    res.status(code).json({
      message,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

const changeAvatar = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Upload success!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

export {
  getInforUser,
  addFollwing,
  removeFollwing,
  addCollection,
  removeCollection,
  searchUserByName,
  changeInforUser,
  changeAvatar,
  checkFollowing,
};
