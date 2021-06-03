import News from '../models/newsModel';
import asyncHandler from 'express-async-handler';

export const getNews = asyncHandler(async (req, res) => {
  const NewsUp = await News.find({}).sort({ createdAt: -1 });
  res.json(NewsUp);
});

export const postNews = asyncHandler(async (req, res) => {
  const { title, subtitle, content } = req.body;
  let New = new News({
    title,
    subtitle,
    content,
  });
  const newUp = await New.save();
  if (newUp) {
    res.status(201).json(newUp);
  } else {
    res.status(400);
    throw err('Internal Server Error');
  }
});

export const putNews = asyncHandler(async (req, res) => {
  const { title, subtitle, content } = req.body;
  let New = await News.findById(req.params.id);
  if (New) {
    New.title = title;
    New.subtitle = subtitle;
    New.content = content;
  }
  const write = await New.save();
  if (write) {
    res.status(201).json(write);
  } else {
    res.status(400);
    throw err('Internal Sever Error');
  }
});

export const deleteNews = asyncHandler(async (req, res) => {
  const New = await News.findOneAndRemove({
    _id: req.params.id,
  });
  if (New) {
    res.json(New);
  } else {
    throw err('Invalid ID !');
  }
});
