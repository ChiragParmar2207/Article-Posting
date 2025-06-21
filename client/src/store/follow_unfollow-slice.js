import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
	isLoading: false,
	followers: [],
	following: [],
};

export const getFollowers = createAsyncThunk(
	'followers/getFollowers',
	async (user, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;

			var config = {
				method: 'get',
				url: 'http://127.0.0.1:5050/api/follow/getFollowers',
				headers: {
					Authorization: 'Bearer ' + token,
				},
			};
			const response = await axios(config);
			console.log(response);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const followUnfollowSlice = createSlice({
	name: 'followers',
	initialState,
	reducer: {},
	extraReducers(builder) {
		builder
			.addCase(getFollowers.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(getFollowers.fulfilled, (state, action) => {
				return {
					...state,
					isLoading: false,
					followers: action.payload.followers,
				};
			})
			.addCase(getFollowers.rejected, (state, action) => {
				toast.error(action.payload);
				return {
					...state,
					isLoading: false,
				};
			});
	},
});

export const followUnfollowActions = followUnfollowSlice.actions;

export default followUnfollowSlice.reducer;
