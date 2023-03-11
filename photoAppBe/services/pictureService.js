import _User from '../models/userModal.js';
import _Bucket from '../models/bucketModal.js';

const pagination = async (req, res, _Modal) => {
  try {
    const { pageSize } = req.body;
    const data = await _Modal.find().limit(pageSize);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getDetail = async (req, res, type, _Modal) => {
  try {
    const { id } = req.params;
    const data = await _Modal.findOne({ _id: id });

    if (!data) {
      return res.status(400).json({ message: `${type} not found!` });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getList = async (req, res, type, _Modal) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;
    const searchInput = req.query.search || '';
    const search = searchInput?.toLowerCase();

    let result;

    if (type === 'video') {
      result = await _Modal
        .find({
          $or: [
            { name: { $regex: search } },
            { typeVideo: { $regex: search } },
          ],
        })
        .skip(page * limit)
        .limit(limit);
    } else {
      result = await _Modal
        .find({
          name: { $regex: search, $options: 'i' },
        })
        .skip(page * limit)
        .limit(limit);
    }

    const total = await _Modal
      .find({
        name: { $regex: search, $options: 'i' },
      })
      .count();

    res.status(200).json({
      page,
      total: total === 0 ? 100 : total,
      pageSize: limit,
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const getTrend = async (req, res, _Modal) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 20;

    const result = await _Modal
      .find({ downloads: { $gt: 100 } })
      .skip(page * limit)
      .limit(limit);
    const total = await _Modal.find({ downloads: { $gt: 100 } }).count();

    res.status(200).json({
      total,
      result,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Server Error!' });
  }
};

// LIKE
const like = async (req, res, type, _Modal) => {
  try {
    const { userId, id } = req.body;

    const user = await _User.find({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    await _Modal.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          likes: {
            userId,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json({ message: `${type} like success!` });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const removeLike = async (req, res, type, _Modal) => {
  try {
    const { userId, id } = req.body;

    const user = await _User.find({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    await _Modal.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          likes: {
            userId: userId,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json({ message: `UnLike ${type} success!` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

const checkLike = async (req, res, _Modal) => {
  try {
    const { userId, id } = req.body;
    const user = await _User.find({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }
    const picture = await _Modal.find({
      _id: id,
      likes: {
        $elemMatch: {
          userId: userId,
        },
      },
    });
    if (picture.length === 0) {
      res.status(200).json({ isLike: false });
    } else {
      res.status(200).json({ isLike: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error server!' });
  }
};

const increaseView = async (req, res, _Modal, type) => {
  const { id } = req.params;

  const rp = await _Modal
    .findOneAndUpdate(
      {
        _id: id,
      },
      {
        $inc: {
          view_num: 1,
        },
      },
      {
        new: true,
        upsert: true,
      }
    )
    .exec();
  if (!rp) res.status(500).json({ message: 'Error!' });
  else return res.status(200).json({ message: 'OK!' });
};

export {
  pagination,
  getDetail,
  getList,
  getTrend,
  like,
  removeLike,
  checkLike,
  increaseView,
};
