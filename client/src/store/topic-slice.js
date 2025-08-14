import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
	topics: [],
	isLoading: false,
	error: undefined,
};

export const getTopics = createAsyncThunk(
	'topics/getTopics',
	async (user, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;
			const response = await axios.get('http://127.0.0.1:5000/api/topic', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const addTopic = createAsyncThunk(
	'topics/AddTopic',
	async (topic, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;
			const response = await axios.post(
				'http://127.0.0.1:5000/api/topic',
				topic,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const topicSlice = createSlice({
	name: 'topics',
	initialState,
	reducer: {},
	extraReducers(builder) {
		builder
			.addCase(getTopics.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(getTopics.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					topics: action.payload.topics,
					error: null,
				};
			})
			.addCase(getTopics.rejected, (state, action) => {
				toast.error(action.payload);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(addTopic.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(addTopic.fulfilled, (state, action) => {
				toast.success('Topic Added Successfully.');
				return {
					...state,
					isLoading: false,
					error: null,
				};
			})
			.addCase(addTopic.rejected, (state, action) => {
				toast.error(action.payload);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			});
	},
});

export const topicActions = topicSlice.actions;

export default topicSlice.reducer;
