import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
	articles: [],
	isLoading: false,
	error: undefined,
};

export const getArticles = createAsyncThunk(
	'articles/getArticles',
	async (user, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;

			var config = {
				method: 'get',
				url: 'http://127.0.0.1:5000/api/article',
				headers: {
					Authorization: 'Bearer ' + token,
				},
			};
			const response = await axios(config);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getArticlesByTopic = createAsyncThunk(
	'articles/getArticlesByTopic',
	async (topicId, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;

			var config = {
				method: 'get',
				url: `http://127.0.0.1:5000/api/article/${topicId}`,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			};
			const response = await axios(config);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getArticlesById = createAsyncThunk(
	'articles/getArticlesById',
	async (articleId, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;

			var config = {
				method: 'get',
				url: `http://127.0.0.1:5000/api/article/getarticlebyid/${articleId}`,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			};
			const response = await axios(config);
			return await response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const addArticle = createAsyncThunk(
	'articles/addArticle',
	async (article, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;
			const response = await axios.post(
				'http://127.0.0.1:5000/api/article',
				article,
				{
					headers: {
						authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.status);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateArticle = createAsyncThunk(
	'articles/updateArticle',
	async (data, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;

			var config = {
				method: 'patch',
				url: `http://127.0.0.1:5000/api/article/${data.id}`,
				headers: {
					authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
				data: { content: data.content },
			};

			const response = await axios(config);
			return await response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteArticle = createAsyncThunk(
	'articles/deleteArticle',
	async (articleId, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;

			var config = {
				method: 'delete',
				url: `http://127.0.0.1:5000/api/article/${articleId}`,
				headers: {
					authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
			};

			const response = await axios(config);
			return await response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const articleSlice = createSlice({
	name: 'articles',
	initialState,
	reducer: {},
	extraReducers(builder) {
		builder
			.addCase(getArticles.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(getArticles.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					articles: action.payload.articles,
					error: null,
				};
			})
			.addCase(getArticles.rejected, (state, action) => {
				toast.error(action.payload);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(addArticle.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(addArticle.fulfilled, (state, action) => {
				toast.success('Article Added Successfully.');
				return {
					...state,
					isLoading: false,
					error: null,
				};
			})
			.addCase(addArticle.rejected, (state, action) => {
				toast.error(action.payload);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(getArticlesByTopic.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(getArticlesByTopic.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: null,
				};
			})
			.addCase(getArticlesByTopic.rejected, (state, action) => {
				toast.error(action.payload);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(getArticlesById.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(getArticlesById.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					error: null,
				};
			})
			.addCase(getArticlesById.rejected, (state, action) => {
				toast.error(action.payload);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(updateArticle.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(updateArticle.fulfilled, (state, action) => {
				toast.success('Article Updated');
				return {
					...state,
					isLoading: false,
					error: null,
				};
			})
			.addCase(updateArticle.rejected, (state, action) => {
				toast.error(action);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(deleteArticle.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(deleteArticle.fulfilled, (state, action) => {
				toast.success('Article Deleted');
				return {
					...state,
					isLoading: false,
					error: null,
				};
			})
			.addCase(deleteArticle.rejected, (state, action) => {
				toast.error(action);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			});
	},
});

export const articleActions = articleSlice.actions;

export default articleSlice.reducer;
