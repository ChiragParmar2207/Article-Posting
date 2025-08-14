import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userData = JSON.parse(localStorage.getItem('userData'));

const initialState = userData
	? userData
	: {
			isLoggedin: false,
			isLoading: false,
			currentUser: null,
			token: null,
			error: undefined,
	  };

export const signinUser = createAsyncThunk(
	'users/signinUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://127.0.0.1:5000/api/user/signin',
				user
			);

			const LoggedInUserData = {
				isLoggedin: true,
				currentUser: response.data.user,
				token: response.data.token,
				isLoading: false,
				error: null,
			};
			localStorage.setItem('userData', JSON.stringify(LoggedInUserData));

			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const signupUser = createAsyncThunk(
	'users/signupUser',
	async (user, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://127.0.0.1:5000/api/user/signup',
				user
			);
			const LoggedInUserData = {
				isLoggedin: true,
				currentUser: response.data.user,
				token: response.data.token,
				isLoading: false,
				error: null,
			};
			localStorage.setItem('userData', JSON.stringify(LoggedInUserData));
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const signout = createAsyncThunk(
	'users/signout',
	async (user, { rejectWithValue }) => {
		try {
			const userData = JSON.parse(localStorage.getItem('userData'));
			const token = userData.token;
			const response = await axios.post(
				'http://127.0.0.1:5000/api/user/logout',
				{},
				{
					headers: {
						authorization: `Bearer ${token}`,
						'content-type': 'application/json',
					},
				}
			);
			localStorage.removeItem('userData');
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const authSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(signinUser.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(signinUser.fulfilled, (state, action) => {
				toast.success('Login Success');
				return {
					...state,
					isLoading: false,
					isLoggedin: true,
					currentUser: action.payload.user,
					token: action.payload.token,
					error: null,
				};
			})
			.addCase(signinUser.rejected, (state, action) => {
				toast.error(action.payload.message);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(signupUser.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(signupUser.fulfilled, (state, action) => {
				toast.success('Register Success');
				return {
					...state,
					isLoading: false,
					isLoggedin: true,
					currentUser: action.payload.user,
					token: action.payload.token,
					error: null,
				};
			})
			.addCase(signupUser.rejected, (state, action) => {
				toast.error(action.payload.message);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			})
			.addCase(signout.pending, (state, action) => {
				return {
					...state,
					isLoading: true,
				};
			})
			.addCase(signout.fulfilled, (state, action) => {
				toast.success('Logout Success');
				return {
					...state,
					isLoggedin: false,
					isLoading: false,
					currentUser: null,
					token: null,
					error: undefined,
				};
			})
			.addCase(signout.rejected, (state, action) => {
				toast.error(action.payload.message);
				return {
					...state,
					isLoading: false,
					error: action.payload,
				};
			});
	},
});

export const userActions = authSlice.actions;

export default authSlice.reducer;
