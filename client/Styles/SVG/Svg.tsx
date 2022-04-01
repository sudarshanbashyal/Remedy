import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
	color: string;
	size: number;
}

export const ChatBubbleIcon = ({ color, size }: Props) => {
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24">
			<Path
				fill={color}
				d="M12 3c5.514 0 10 3.592 10 8.007 0 4.917-5.144 7.961-9.91 7.961-1.937 0-3.384-.397-4.394-.644-1 .613-1.594 1.037-4.272 1.82.535-1.373.722-2.748.601-4.265-.837-1-2.025-2.4-2.025-4.872 0-4.415 4.486-8.007 10-8.007zm0-2c-6.338 0-12 4.226-12 10.007 0 2.05.739 4.063 2.047 5.625.055 1.83-1.023 4.456-1.993 6.368 2.602-.47 6.301-1.508 7.978-2.536 1.417.345 2.774.503 4.059.503 7.084 0 11.91-4.837 11.91-9.961-.001-5.811-5.702-10.006-12.001-10.006z"
			/>
		</Svg>
	);
};

export const GraphIcon = ({ color, size }: Props) => {
	return (
		<Svg width={size} height={size} fill-rule="evenodd" clip-rule="evenodd">
			<Path
				fill={color}
				d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
			/>
		</Svg>
	);
};

export const SettingsIcon = ({ color, size }: Props) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M24 14.187v-4.374c-2.148-.766-2.726-.802-3.027-1.529-.303-.729.083-1.169 1.059-3.223l-3.093-3.093c-2.026.963-2.488 1.364-3.224 1.059-.727-.302-.768-.889-1.527-3.027h-4.375c-.764 2.144-.8 2.725-1.529 3.027-.752.313-1.203-.1-3.223-1.059l-3.093 3.093c.977 2.055 1.362 2.493 1.059 3.224-.302.727-.881.764-3.027 1.528v4.375c2.139.76 2.725.8 3.027 1.528.304.734-.081 1.167-1.059 3.223l3.093 3.093c1.999-.95 2.47-1.373 3.223-1.059.728.302.764.88 1.529 3.027h4.374c.758-2.131.799-2.723 1.537-3.031.745-.308 1.186.099 3.215 1.062l3.093-3.093c-.975-2.05-1.362-2.492-1.059-3.223.3-.726.88-.763 3.027-1.528zm-4.875.764c-.577 1.394-.068 2.458.488 3.578l-1.084 1.084c-1.093-.543-2.161-1.076-3.573-.49-1.396.581-1.79 1.693-2.188 2.877h-1.534c-.398-1.185-.791-2.297-2.183-2.875-1.419-.588-2.507-.045-3.579.488l-1.083-1.084c.557-1.118 1.066-2.18.487-3.58-.579-1.391-1.691-1.784-2.876-2.182v-1.533c1.185-.398 2.297-.791 2.875-2.184.578-1.394.068-2.459-.488-3.579l1.084-1.084c1.082.538 2.162 1.077 3.58.488 1.392-.577 1.785-1.69 2.183-2.875h1.534c.398 1.185.792 2.297 2.184 2.875 1.419.588 2.506.045 3.579-.488l1.084 1.084c-.556 1.121-1.065 2.187-.488 3.58.577 1.391 1.689 1.784 2.875 2.183v1.534c-1.188.398-2.302.791-2.877 2.183zm-7.125-5.951c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.762 0-5 2.238-5 5s2.238 5 5 5 5-2.238 5-5-2.238-5-5-5z"
			/>
		</Svg>
	);
};

export const SearchIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"
			/>
		</Svg>
	);
};

export const BackIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
			/>
		</Svg>
	);
};

export const PhoneIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M6.176 1.322l2.844-1.322 4.041 7.89-2.724 1.341c-.538 1.259 2.159 6.289 3.297 6.372.09-.058 2.671-1.328 2.671-1.328l4.11 7.932s-2.764 1.354-2.854 1.396c-7.862 3.591-19.103-18.258-11.385-22.281zm1.929 1.274l-1.023.504c-5.294 2.762 4.177 21.185 9.648 18.686l.971-.474-2.271-4.383-1.026.5c-3.163 1.547-8.262-8.219-5.055-9.938l1.007-.497-2.251-4.398z"
			/>
		</Svg>
	);
};

export const VideoIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M13.5 8c.276 0 .5.224.5.5v7c0 .276-.224.5-.5.5h-11c-.276 0-.5-.224-.5-.5v-7c0-.276.224-.5.5-.5h11zm2.5 0c0-1.104-.896-2-2-2h-12c-1.104 0-2 .896-2 2v8c0 1.104.896 2 2 2h12c1.104 0 2-.896 2-2v-8zm6 1.854v4.293l-2-1.408v-1.478l2-1.407zm2-3.854l-6 4.223v3.554l6 4.223v-12z"
			/>
		</Svg>
	);
};

export const ImageIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"
			/>
		</Svg>
	);
};

export const SendIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 12l-4.5 4.5 1.527 1.5 5.973-6-5.973-6-1.527 1.5 4.5 4.5z"
			/>
		</Svg>
	);
};

export const MoreIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M6 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm9 0c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
			/>
		</Svg>
	);
};

export const CancelIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z"
			/>
		</Svg>
	);
};

export const PlusIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
			/>
		</Svg>
	);
};

export const MinusIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z"
			/>
		</Svg>
	);
};

export const PillsIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M17.5 10c3.587 0 6.5 2.913 6.5 6.5s-2.913 6.5-6.5 6.5-6.5-2.913-6.5-6.5 2.913-6.5 6.5-6.5zm-7.802 9.864l-.363.635c-1.381 2.391-4.443 3.211-6.834 1.831-2.391-1.381-3.211-4.443-1.831-6.834l6.868-11.995c.925-1.602 2.606-2.499 4.333-2.501.85-.001 1.712.215 2.501.67 2.245 1.297 3.106 4.076 2.058 6.39-.979.125-1.906.416-2.753.844l.793-1.401c.828-1.434.336-3.272-1.099-4.1-1.434-.828-3.272-.336-4.1 1.099l-2.866 5.063 3.975 2.295c-.363.557-.663 1.16-.889 1.797l-4.086-2.359-3.002 5.199c-.828 1.434-.336 3.272 1.099 4.1 1.434.828 3.272.336 4.1-1.099l1.42-2.459c.063.998.298 1.949.676 2.825zm10.882-6.644l-4.381 7.589c.412.124.849.191 1.301.191 2.484 0 4.5-2.016 4.5-4.5 0-1.293-.546-2.459-1.42-3.28zm-1.725-1.012c-.428-.135-.883-.208-1.355-.208-2.484 0-4.5 2.016-4.5 4.5 0 1.313.563 2.495 1.461 3.318l4.394-7.61z"
			/>
		</Svg>
	);
};

export const NotificationIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z"
			/>
		</Svg>
	);
};

export const UserIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.082 0-8.465 4.949-3.732 13.678 1.598 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h1.995c0-3.134-.125-3.55 1.838-4.003 2.851-.657 5.543-1.278 6.525-3.456.359-.795.592-2.103-.338-3.815-2.058-3.799-2.578-7.089-1.423-9.026 1.354-2.275 5.426-2.264 6.767-.034 1.15 1.911.639 5.219-1.403 9.076-.91 1.719-.671 3.023-.31 3.814.99 2.167 3.707 2.794 6.584 3.458 1.879.436 1.76.882 1.76 3.986h1.995l.005-1.241c0-2.52-.199-3.975-3.178-4.663z"
			/>
		</Svg>
	);
};

export const ProfileSettingsIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M19 18c0 1.104-.896 2-2 2s-2-.896-2-2 .896-2 2-2 2 .896 2 2zm-14-3c-1.654 0-3 1.346-3 3s1.346 3 3 3h14c1.654 0 3-1.346 3-3s-1.346-3-3-3h-14zm19 3c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5zm-17-14c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-2-1c-1.654 0-3 1.346-3 3s1.346 3 3 3h14c1.654 0 3-1.346 3-3s-1.346-3-3-3h-14zm19 3c0 2.761-2.239 5-5 5h-14c-2.761 0-5-2.239-5-5s2.239-5 5-5h14c2.761 0 5 2.239 5 5z"
			/>
		</Svg>
	);
};

export const CalendarIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z"
			/>
		</Svg>
	);
};

export const GenderIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M16 0v2h2.586l-2.113 2.113c-.981-.698-2.177-1.113-3.473-1.113-2.22 0-4.144 1.216-5.18 3.009-3.229.096-5.82 2.738-5.82 5.991 0 2.973 2.164 5.433 5 5.91v2.09h-3v2h3v2h2v-2h3v-2h-3v-2.09c1.791-.301 3.294-1.403 4.167-2.918 3.235-.09 5.833-2.735 5.833-5.992 0-1.296-.415-2.492-1.113-3.473l2.113-2.113v2.586h2v-6h-6zm-3 13c-1.944 0-3.564-1.396-3.923-3.236-.66-.333-1.365-.346-2.033-.066.266 2.293 1.827 4.181 3.931 4.938-.729.831-1.784 1.364-2.975 1.364-2.206 0-4-1.794-4-4s1.794-4 4-4c1.937 0 3.555 1.384 3.921 3.214.679.35 1.309.383 2.033.077-.27-2.293-1.837-4.179-3.943-4.931.732-.83 1.797-1.36 2.989-1.36 2.206 0 4 1.794 4 4s-1.794 4-4 4z"
			/>
		</Svg>
	);
};

export const NextIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
			/>
		</Svg>
	);
};

export const PlusOutlineIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"
			/>
		</Svg>
	);
};

export const FileIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M9 1v7.5c0 1.933-1.566 3.5-3.5 3.5s-3.5-1.567-3.5-3.5v-6c0-1.381 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5v4.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5v-4h1v4c0 .275.225.5.5.5s.5-.225.5-.5v-4.5c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5v6c0 1.378 1.121 2.5 2.5 2.5s2.5-1.122 2.5-2.5v-7.5h1zm2 0v2c3.282 0 3.772 2.946 3 6 0 0 6-1.65 6 2.457v10.543h-15v-8.025c-.715-.065-1.39-.269-2-.582v10.607h19v-13.386c0-1.843-5.583-9.614-11-9.614zm6 13h-9v1h9v-1zm0 3h-9v-1h9v1zm0 2h-9v-1h9v1z"
			/>
		</Svg>
	);
};

export const DownloadIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M6 13h4v-7h4v7h4l-6 6-6-6zm16-1c0 5.514-4.486 10-10 10s-10-4.486-10-10 4.486-10 10-10 10 4.486 10 10zm2 0c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z"
			/>
		</Svg>
	);
};

export const ForwardIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M14 18l10-7.088-10-6.912v3.042s-11.618 2.583-14 12.958c5.072-5.431 14-5.218 14-5.218v3.218z"
			/>
		</Svg>
	);
};

export const BasicPlusIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path fill={color} d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
		</Svg>
	);
};

export const TickIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"
			/>
		</Svg>
	);
};

export const MailIcon = ({ color, size }: Props) => {
	return (
		<Svg
			viewBox="0 0 30 30"
			width={size}
			height={size}
			fill-rule="evenodd"
			clip-rule="evenodd"
		>
			<Path
				fill={color}
				d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"
			/>
		</Svg>
	);
};
