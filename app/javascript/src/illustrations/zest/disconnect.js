import React from "react";
import { theme } from "@advisable/donut";

export default function DisconnectIllustration({
  color = theme.colors.blue300,
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1000 1000"
      {...props}
    >
      <path
        fill="#232323"
        d="M842.422 466.847l-196.98 31.017c8.663-1.353 26.224 32.937 30.997 39.013 17.238 21.943 41.836 43.728 53.822 69.022-10.173 4.39-30.224-3.499-40.788-6.458-14.337-3.999-28.42-8.869-42.895-12.397l-71.245-17.386c-5.234 32.164-2.372 67.885-3.509 100.49-1.147 32.81 3.126 71.843-4.165 103.664-19.482-26.568-32.065-62.887-46.912-92.483l-45.923-91.571c-.294-.588-.588-1.186-.892-1.774-22.912 24.373-45.492 49.049-68.355 73.5-21.462 22.913-43.365 52.097-68.943 70.247 2.94-31.987 14.102-62.269 21.893-93.208 2.548-10.104 15.249-91.591 21.325-92.541L198.513 574.48l130.399-115.003c-4.44 3.92-69.963-31.086-76.352-33.918-19.884-8.82-39.945-17.238-59.908-25.872-18.894-8.173-43.776-15.327-59.848-28.067 27.871-9.878 64.827-3.597 94.178-4.9l108.466-4.9 5.341-.235c-4.9.215-28.626-54.949-31.262-60.015-2.362-14.593-13.083-27.764-20.58-40.18a633.935 633.935 0 01-26.754-49.196c-.676-1.372-.862-2.48.186-3.666 28.871 6.527 55.037 29.724 80.684 43.865 5.243 2.94 68.463 33.026 67.796 37.387l31.154-204.065c.657-4.302 1.147-8.918 2.47-12.819 9.967 17.062 14.367 40.592 20.766 59.477 13.72 26.117 20.071 59.339 29.547 87.376 5.361 15.837 8.144 37.721 17.944 51.205 23.52-18.012 45.335-38.435 67.914-57.643l50.646-43.12c3.019-2.568 27.568-27.587 31.057-26.362h.656c-4.253 35.427-23.971 72.951-35.388 106.722L612.7 294.817c-2.136 6.341-2.803 13.201-6.341 18.983 30.086-9.31 60.515-17.464 91.14-25 28.754-7.085 61.544-19.247 91.062-20.413-5.37 15.533-25.127 30.625-37.142 41.62-13.71 12.505-27.979 24.373-41.121 37.387-4.537 4.499-47.863 54.469-53.018 52.607l185.142 66.846z"
      ></path>
      <path
        fill="#232323"
        d="M841.923 465.024l-66.64 10.496-105.84 16.66-24.54 3.9c-2.087.324-1.617 3.92.51 3.705 3.146-.265 6.017 3.528 7.84 5.635a102.538 102.538 0 018.399 11.564c4.429 6.801 8.163 14.19 12.994 20.727 17.444 23.598 40.935 42.326 53.9 69.178l1.127-2.774c-9.564 3.675-21.462-.833-30.703-3.684a2548.616 2548.616 0 00-36.721-11.016c-28.42-8.369-57.692-14.513-86.504-21.56a1.902 1.902 0 00-2.323 1.323c-5.39 34.144-2.714 69.002-3.645 103.42-.902 33.496 3.312 67.708-4.018 100.734l3.449-.461c-19.022-26.215-29.939-57.134-43.816-86.142-16.023-33.496-33.182-66.522-49.911-99.675a1.9 1.9 0 00-2.94-.383c-24.167 25.716-48.334 51.47-72.118 77.538-20.708 22.687-39.651 47.804-64.808 65.885l2.842 1.627c3.323-34.525 17.013-66.405 23.364-100.234 3.92-20.913 7.359-41.944 12.103-62.72 1.107-4.9 2.254-9.722 3.743-14.485a36.983 36.983 0 011.705-4.733c.294-.617 1.235-1.872.931-1.793 2.401-.618 1.333-4.009-.98-3.636l-61.142 9.623-97.578 15.377-22.589 3.557 1.842 3.156 43.933-38.759 70.178-61.897 16.288-14.377c1.587-1.401-.539-4.224-2.293-2.94-.863.627-5.106-1.068-6.468-1.538-4.802-1.666-9.467-3.734-14.103-5.88-11.025-4.979-21.854-10.379-32.653-15.837-26.95-13.612-54.655-25.343-82.457-37.152-19.6-8.301-41.102-14.014-58.144-27.215l-.833 3.166c30.292-10.388 63.377-3.538 94.639-4.9a40832.44 40832.44 0 00112.847-5.037 1.892 1.892 0 000-3.783c.647.049-.422-.627-.872-1.206a37.241 37.241 0 01-2.225-3.302c-2.087-3.362-3.92-6.86-5.743-10.408-4.429-8.516-8.447-17.248-12.465-25.97-2.637-5.752-5.88-11.544-8.007-17.503-2.195-6.144-3.508-12.073-6.664-17.953-3.626-6.762-8.036-13.054-12.132-19.522-5.194-8.202-9.977-16.66-14.651-25.186a688.809 688.809 0 01-7.047-13.181 460.386 460.386 0 01-3.4-6.644c-.902-1.794-4.636-7.35-3.548-9.291l-2.126.873c30.958 7.32 54.164 30.242 81.781 44.482 15.729 8.104 31.742 15.611 47.304 24.039 4.195 2.274 8.379 4.577 12.427 7.105a43.485 43.485 0 014.194 2.823c.519.421 1.372 1.715 1.392.98 0 2.067 3.381 2.646 3.704.499l16.738-109.76 8.223-53.9 4.106-26.96c1.323-8.663 1.96-17.904 4.527-26.303l-3.449.451c6.86 12.054 10.701 25.48 14.484 38.749 1.852 6.508 3.45 13.23 5.88 19.6 2.499 6.606 6.037 12.848 8.556 19.483 5.154 13.563 9.055 27.548 13.024 41.493 3.694 12.985 8.183 25.764 11.603 38.818 3.587 13.632 6.497 28.204 14.7 39.954a1.96 1.96 0 002.587.677c25.48-19.6 49-41.552 73.5-62.377 19.208-16.337 38.661-32.34 56.968-49.686 3.684-3.479 7.399-6.958 11.299-10.202 2.234-1.872 5.223-4.665 7.546-4.538l-1.882-1.891c-3.724 28.988-16.062 56.105-26.714 83.045-5.43 13.72-10.134 27.607-14.838 41.562l-7.477 22.128c-2.47 7.331-3.567 15.445-7.399 22.227a1.96 1.96 0 002.136 2.773c31.174-9.623 62.72-17.718 94.316-25.813 28.821-7.379 57.359-18.15 87.347-19.531l-1.823-2.392c-5.576 15.102-20.002 26.068-31.693 36.358-14.386 12.662-28.93 25.275-42.718 38.573-12.975 12.534-24.363 26.715-36.946 39.641-3.646 3.734-7.321 7.448-11.221 10.908-1.137.98-5.41 5.037-6.321 4.811a1.892 1.892 0 00-.98 3.646l62.72 22.638 99.45 35.907 22.962 8.232c2.293.823 3.273-2.822.98-3.645l-62.72-22.638-99.421-35.878-22.981-8.301-.98 3.646c4.9 1.195 11.76-7.321 14.651-10.124 8.202-7.938 15.944-16.346 23.637-24.774 5.4-5.88 10.614-12.025 16.17-17.777 13.514-14.034 28.842-26.529 43.346-39.524 13.141-11.76 29.4-23.578 35.721-40.728a1.904 1.904 0 00-1.823-2.392c-29.792 1.372-58.134 11.809-86.74 19.248-32.105 8.349-64.21 16.434-95.922 26.224l2.126 2.774c3.42-6.066 4.44-12.877 6.537-19.434 2.567-8.036 5.4-15.993 8.095-23.98 4.9-14.563 9.8-29.106 15.454-43.404 10.78-27.313 23.079-54.655 26.852-84.045.137-1.049-.98-1.843-1.891-1.892-5.42-.284-10.966 6.194-14.622 9.477-5.958 5.341-11.544 11.064-17.424 16.484-11.329 10.446-23.52 20.09-35.28 30.076-13.005 11.064-25.97 22.158-38.798 33.418-14.749 12.965-29.518 25.901-45.129 37.867l2.577.676c-7.477-10.652-10.388-23.716-13.593-36.132-3.41-13.23-7.908-26.147-11.662-39.279-3.988-13.945-7.84-27.969-12.838-41.591-2.342-6.37-5.007-12.573-7.928-18.698-2.92-6.125-4.596-13.005-6.478-19.6-4.165-14.593-8.183-29.479-15.758-42.748a1.96 1.96 0 00-3.45.45c-2.41 8.096-3.067 16.984-4.37 25.334l-4.234 27.91-8.222 53.9-16.739 109.76 3.715.51c.068-4.195-9.065-8.075-11.858-9.692-9.154-5.302-18.62-10.124-28.038-14.906-8.262-4.185-16.582-8.271-24.873-12.407-11.191-5.576-21.56-12.74-31.938-19.6-16.542-10.888-33.653-21.864-53.165-26.46a1.96 1.96 0 00-2.136.872c-1.343 2.382-.882 3.92.225 6.409 2.186 4.802 4.714 9.487 7.154 14.161a608.376 608.376 0 0013.965 25.353c8.82 15.18 21.168 29.655 25.304 47.04 1.499 6.311 5.321 12.544 8.016 18.434 4.391 9.594 8.82 19.188 13.72 28.567a106.051 106.051 0 006.645 11.652c1.205 1.744 2.685 4.136 5.027 4.312v-3.783c-38.22 1.705-76.371 3.646-114.562 5.116-31.095 1.195-63.788-5.38-93.923 4.949-1.186.402-2.048 2.215-.833 3.155 15.268 11.839 33.986 17.905 51.754 24.902 22.148 8.732 43.972 18.552 65.748 28.175 19.6 8.663 38.22 19.532 57.82 28.293a153.119 153.119 0 0014.808 5.988c2.156.705 6.066 2.312 8.212.764l-2.293-2.94-43.943 38.769-70.149 61.867-16.287 14.367c-1.559 1.372.166 3.42 1.842 3.156l61.132-9.634 97.589-15.366 22.589-3.558-.98-3.635c-4.538 1.176-5.978 11.407-6.909 14.945-2.94 11.162-5.126 22.54-7.291 33.849-2.117 11.015-4.077 22.06-6.096 33.085-2.117 11.603-5.165 22.863-8.399 34.211-6.683 23.52-13.563 47.04-15.915 71.482a1.903 1.903 0 002.842 1.636c25.01-17.973 43.973-42.669 64.494-65.297 24.059-26.529 48.667-52.616 73.186-78.724l-2.94-.382c16.729 33.154 33.889 66.189 49.912 99.686 13.886 29.008 24.794 59.917 43.816 86.142.882 1.215 3.067 1.274 3.449-.451 7.174-32.291 3.518-65.66 4.087-98.461.607-35.044-1.901-70.952 3.587-105.693l-2.323 1.323c30.017 7.321 60.466 13.72 90.062 22.599 12.142 3.646 24.265 7.34 36.417 10.947 8.986 2.665 20.227 6.233 29.449 2.695a1.96 1.96 0 001.127-2.783c-6.684-13.809-16.307-25.872-26.323-37.407-9.555-10.986-20.629-21.374-28.802-33.467-5.322-7.84-9.8-16.307-15.22-24.088-3.273-4.655-9.241-14.593-16.101-14.005l.5 3.705 66.64-10.457 105.84-16.66 24.5-3.861c2.381-.412 1.362-4.047-1.019-3.675z"
      ></path>
      <path
        fill="#fff"
        d="M729.154 428.734c7.076-13.788 22.471-22.451 32.017-35.103 4.821-6.39 9.515-13.465 16.826-16.719 19.149-8.506 24.334 15.935 21.394 29.028 5.203-7.174 16.454-8.987 23.647-3.803 7.193 5.184 9.026 16.435 3.851 23.628 10.026-7.164 25.48-1.499 31.262 9.408s3.342 24.657-2.94 35.28c8.046 1.362 14.191 8.732 15.798 16.719 6.252 30.889-26.362 51.205-52.753 53.9-19.708 2.019-39.73-3.558-56.948-13.367-28.969-16.513-50.676-45.463-57.889-78.028-7.014-31.147 4.719-63.531 30.057-82.957 10.525-8.144 22.354-14.994 35.368-17.758a58.154 58.154 0 0123.451.059c5.88 1.127 10.78 2.685 14.847-2.822 3.636-4.9 1.735-11.76 5.234-16.748 3.626-5.155 10.946-7.272 16.905-5.626 23.284 6.419 31.232 49.588 45.08 67.13 15.68 19.787 31.536 37.476 52.371 51.578 10.525 7.124 16.434 19.864 17.228 32.555.794 12.691-3.038 25.324-8.82 36.672a113.001 113.001 0 01-57.732 53.067"
      ></path>
      <path
        fill="#232323"
        d="M731.819 430.283c5.145-9.477 13.622-16.18 21.394-23.412a93.654 93.654 0 0010.78-11.594c3.391-4.41 6.576-9.163 11.015-12.622 6.439-5.018 14.7-5.998 18.777 1.96 3.097 6.027 3.587 13.798 2.195 20.345-.657 3.106 3.528 6.438 5.88 3.449 4.43-5.556 12.789-7.781 18.894-3.41 6.106 4.371 6.811 12.936 2.94 18.865-1.96 3.058 1.96 7.066 5.067 5.057 8.389-5.508 19.845-1.588 25.157 6.468 6.624 10.064 3.498 23.324-2.147 33.006a3.999 3.999 0 002.362 5.802c12.436 2.744 15.249 17.326 12.427 28.057-2.666 10.124-10.29 18.209-18.895 23.765-21.305 13.72-47.549 13.456-70.619 4.293-46.167-18.317-84.093-74.049-66.757-124.127 8.487-24.5 30.84-44.825 55.762-51.793a54.06 54.06 0 0124.088-1.078c5.077.882 10.437 2.528 15.367.176 5.429-2.597 7.84-8.065 8.741-13.72.461-2.94.608-6.282 2.764-8.594a11.288 11.288 0 018.3-3.244c8.575.147 15.122 8.653 19.248 15.209 5.409 8.585 9.329 18.023 13.445 27.274 3.597 8.085 7.193 16.307 12.642 23.353a301.823 301.823 0 0027.538 31.36 193.775 193.775 0 0016.258 14.259c5.155 4.018 11.123 7.321 15.465 12.24 8.957 10.153 10.907 24.706 8.281 37.603-5.312 25.99-24.255 48.941-46.305 62.906a113.786 113.786 0 01-16.719 8.722c-4.684 1.96-1.284 10.241 3.508 8.301 26.46-10.702 48.912-30.723 61.446-56.576 6.802-14.033 10.78-29.831 7.615-45.383a48.082 48.082 0 00-8.026-18.542c-4.42-6.076-10.153-9.8-16.111-14.239-12.633-9.32-23.765-20.58-33.997-32.458-8.143-9.447-15.229-18.62-20.501-29.919-8.232-17.64-15.602-43.414-35.28-51.656-12.28-5.135-26.049 1.293-28.312 14.7-.52 3.087-.51 7.997-3.675 9.8-2.372 1.342-5.792 0-8.262-.422a66.76 66.76 0 00-25.029-.215c-28.185 5.488-54.076 28.008-65.033 54.223-22.54 53.988 16.16 116.434 66.18 138.435 25.538 11.231 55.154 12.789 79.791-1.578 9.869-5.762 18.679-13.994 23.236-24.627 4.557-10.633 4.9-24.549-1.96-34.3a23.517 23.517 0 00-14.484-9.8l2.361 5.801c7.194-12.74 10.114-30.38.432-42.728-7.84-10.035-22.942-14.435-33.997-7.114l5.057 5.066c5.88-8.947 3.979-21.971-4.841-28.361-8.82-6.39-21.756-4.234-28.351 4.165l5.88 3.44c2.94-14.524-2.842-40.082-22.825-34.3-12.74 3.704-18.394 16.66-26.979 25.48-9.163 9.447-20.198 17.238-26.46 29.076-1.862 3.499 3.43 6.606 5.331 3.107l-.059.049z"
      ></path>
      <path
        fill="#fff"
        d="M454.41 347.787a502.327 502.327 0 013.92-79.38 571.69 571.69 0 0135.898 78.498c21.442-25.196 43.394-50.833 71.677-67.993l-15.837 67.366a662.076 662.076 0 01104.997-10.496l-79.605 88.337c-2.323 2.568-4.802 5.968-3.499 9.173 1.196 2.94 4.812 3.812 7.909 4.351a498.21 498.21 0 0178.135 20.217c-20.981 19.414-49.705 27.607-77.273 35.173a215.305 215.305 0 0145.012 48.392c-6.311 4.704-15.21 1.96-22.481-.98a739.695 739.695 0 01-67.454-31.938 263.913 263.913 0 00-16.836 73.088l-42.562-68.6c-5.272 10.457-14.445 18.307-23.382 25.862l-34.506 29.195a609.843 609.843 0 0110.309-63.495l-55.958 1.118c-3.782.068-8.82-.853-9.182-4.616-.245-2.303 1.548-4.253 3.195-5.88a331.34 331.34 0 0041.816-50.362 6.539 6.539 0 001.274-2.764c.412-3.489-4.253-4.978-7.752-5.302a177.385 177.385 0 01-70.364-21.854 349.954 349.954 0 0084.016-30.635l-34.153-34.721c-7.536-7.664-15.278-15.631-19.071-25.686a14725.276 14725.276 0 0189.415 25.764"
      ></path>
      <path
        fill="#232323"
        d="M456.008 347.786a529.613 529.613 0 014.165-79.38l-3.371.922a552.951 552.951 0 0135.427 78.135c.49 1.372 2.401 2.225 3.518.98 21.472-24.833 42.924-50.372 71.109-67.904l-2.685-2.068c-5.155 22.481-10.711 44.874-16.101 67.297a2.135 2.135 0 002.587 2.587 688.788 688.788 0 01104.438-10.329l-1.548-3.744a69784.275 69784.275 0 00-41.758 46.344 65071.768 65071.768 0 00-20.854 23.138c-6.194 6.86-13.23 13.573-18.728 21.05-3.42 4.665-3.724 10.477 1.96 13.348 3.224 1.627 7.223 1.833 10.721 2.479 4.92.915 9.82 1.895 14.7 2.94a505.2 505.2 0 0157.82 16.337l-.98-3.587c-21.207 19.238-49.333 27.215-76.312 34.653-1.402.392-2.225 2.519-.931 3.538a214.91 214.91 0 0144.599 48.02l.794-3.009c-6.497 4.234-14.229 1.402-20.795-1.244-7.899-3.195-15.68-6.645-23.462-10.163a757.174 757.174 0 01-43.502-21.491 2.157 2.157 0 00-3.116 1.264 274.583 274.583 0 00-16.876 73.657l3.92-1.049a426103.22 426103.22 0 00-42.561-68.6 2.097 2.097 0 00-3.607 0c-5.88 11.211-15.68 19.218-25.205 27.264-10.78 9.146-21.56 18.26-32.34 27.342l3.616 1.499a631.869 631.869 0 0110.349-62.906 2.274 2.274 0 00-2.156-2.832l-50.166.98c-2.94.058-7.174.872-9.947-.314-5.547-2.362 2.577-8.987 4.753-11.231a330.074 330.074 0 0015.454-17.081 339.75 339.75 0 0012.995-16.435 316.463 316.463 0 006.713-9.359c1.49-2.166 3.646-4.567 3.557-7.36-.156-4.38-4.772-6.183-8.467-6.801-7.409-1.235-14.857-1.783-22.216-3.381a178.823 178.823 0 01-48.55-18.316l-.548 4.018a363.476 363.476 0 0084.593-30.762 2.315 2.315 0 00.461-3.607c-9.8-9.963-19.6-19.916-29.4-29.86-8.761-8.899-18.62-17.689-23.354-29.508l-2.704 2.715c29.85 8.418 59.623 17.13 89.385 25.852 2.842.833 4.058-3.606 1.216-4.43-29.802-8.575-59.643-17.042-89.435-25.676-1.49-.431-3.342 1.118-2.705 2.715 4.547 11.486 13.093 20.139 21.609 28.802l32.105 32.634.47-3.606a349.94 349.94 0 01-83.378 30.517 2.204 2.204 0 00-.529 3.989 178.833 178.833 0 0064.317 21.393c3.273.431 7.115.284 10.221 1.47 3.107 1.186 1.784 3.254.481 5.517-1.157 2.009-2.705 3.92-4.058 5.802a325.652 325.652 0 01-30.821 36.956c-3.302 3.41-10.329 8.124-9.388 13.72.755 4.527 5.645 5.958 9.604 6.223 9.143.637 18.62-.294 27.812-.48l29.91-.608-2.156-2.832a626.205 626.205 0 00-10.27 64.092c-.216 1.96 2.371 2.548 3.616 1.489 11.244-9.545 22.497-19.08 33.761-28.606 9.32-7.84 18.62-15.925 24.431-26.881h-3.606a426103.22 426103.22 0 0042.561 68.6 2.108 2.108 0 003.92-1.059 265.199 265.199 0 0116.788-72.52l-3.117 1.274a749.435 749.435 0 0050.264 24.647c7.625 3.381 15.386 7.223 23.373 9.663 6.233 1.96 12.819 2.45 18.483-1.284a2.224 2.224 0 00.784-3.008 224.76 224.76 0 00-45.403-48.775l-.921 3.538c27.783-7.605 56.448-15.847 78.213-35.701a2.163 2.163 0 00-.98-3.577 507.774 507.774 0 00-50.509-14.544 601.656 601.656 0 00-25.754-5.301c-4.175-.765-10.3-1.137-7.34-7.742 1.705-3.813 6.419-7.468 9.212-10.555a134746.17 134746.17 0 0072.461-80.36 2.215 2.215 0 00-1.549-3.734 660.106 660.106 0 00-105.555 10.653l2.587 2.587c5.164-22.481 10.172-45.011 15.572-67.434a1.85 1.85 0 00-.663-1.917 1.85 1.85 0 00-2.022-.16c-28.636 17.365-50.96 42.669-72.246 68.09l3.518.931a618.255 618.255 0 00-36.358-78.851c-.98-1.734-3.165-.725-3.381.912a503.465 503.465 0 00-3.743 79.38c.068 2.048 3.253 2.058 3.204 0v.009z"
      ></path>
      <path
        fill={color}
        d="M646.599 841.344c-10.888-41.787-5.567-70.433-4.097-76.842 1.902-16.278 11.016-31.732 27.842-47.226 13.995-12.877 31.929-24.784 50.96-37.387 28.714-19.061 58.398-38.769 79.165-64.416 22.912-28.292 30.429-58.368 23.667-94.658-7.968-42.747-25.774-73.794-52.92-92.286-40.18-27.362-88.485-18.424-88.965-18.326l-5.556-27.803c2.42-.48 59.936-11.456 110.093 22.481 33.81 22.873 55.732 60.133 65.16 110.74 8.281 44.443-1.372 82.938-29.498 117.679-23.52 29.027-56.448 50.901-85.515 70.197-33.006 21.903-64.19 42.601-66.346 64.807l-.127 1.304-.304 1.039c-.304 1.244-6.017 25.656 3.851 63.553l-27.41 7.144z"
      ></path>
      <path
        fill="#232323"
        d="M668.452 379.117c14.259 1.284 15.945 14.357 13.387 22.432-.578 1.843-5.576 9.879-7.507 9.869"
      ></path>
      <path
        fill="#232323"
        d="M667.678 381.93c6.802 1.43 11.319 5.713 11.27 12.887a14.823 14.823 0 01-1.401 6.438 30.244 30.244 0 01-2.146 3.43c-.402.598-2.176 3.117-2.078 3.087-4.723 1.431-2.714 8.124 1.96 7.291 3.979-.705 6.929-5.762 8.722-8.947a21.47 21.47 0 002.646-11.76c-.509-10.623-7.605-17.797-18.247-18.13-3.225-.098-4.018 5.027-.775 5.713l.049-.009z"
      ></path>
      <path
        fill={color}
        d="M562.21 353.333l52.121-5.68c31.207-3.401 59.263 19.14 62.664 50.347 3.401 31.207-19.14 59.262-50.347 62.664l-52.121 5.68-12.317-113.011z"
      ></path>
      <path
        fill="#fff"
        d="M267.564 546.06c-9.506-12.24-26.235-17.894-37.966-28.567-5.88-5.39-11.838-11.475-19.6-13.318-20.393-4.821-20.962 20.159-15.68 32.477-6.438-6.085-17.826-5.791-23.941.637-6.115 6.429-5.821 17.817.588 23.942-11.182-5.194-25.343 3.244-28.979 15.023-3.635 11.78 1.274 24.853 9.438 34.094-7.654 2.823-12.329 11.202-12.436 19.355-.432 31.507 35.378 45.443 61.818 43.218 19.747-1.656 38.387-10.838 53.488-23.667 25.412-21.56 41.396-54.056 42.454-87.386 1.131-31.919-16.403-61.582-44.913-75.98-11.839-6.056-24.736-10.593-38.034-10.907a58.17 58.17 0 00-23.04 4.439c-5.566 2.196-10.065 4.636-15.112 0-4.478-4.145-3.92-11.25-8.241-15.493-4.518-4.401-12.103-5.116-17.64-2.401-21.698 10.613-21.56 54.507-31.909 74.313a481.216 481.216 0 01-26.774 44.894c-3.587 5.341-7.291 13.504-11.956 17.875-5.027 4.704-12.28 5.772-17.581 10.417-9.8 8.556-11.76 23.677-7.409 35.927s13.779 21.991 24.03 29.969a150.539 150.539 0 0099.244 31.242"
      ></path>
      <path
        fill="#232323"
        d="M269.749 543.884c-8.379-10.437-20.746-16.062-31.477-23.618-10.271-7.242-18.189-19.021-31.752-20.001-19.777-1.431-21.012 24.068-15.592 37.338l5.88-3.421c-8.115-7.105-21.237-7.487-28.989.559-7.751 8.046-6.967 21.266.539 29.096l3.587-6.154c-12.23-5.155-26.411 2.371-32.026 13.72-6.988 14.122-.667 30.458 8.82 41.689l1.705-6.458c-13.034 5.321-17.14 19.041-14.7 32.065 2.127 11.202 9.359 20.443 18.542 26.872 21.452 15.043 50.528 14.749 73.98 4.949 54.586-22.805 91.973-95.932 63.367-151.41-13.828-26.813-42.797-45.354-72.648-48.441a61.744 61.744 0 00-24.657 2.499c-3.567 1.117-7.046 3.106-10.701 3.871-4.606.98-6.331-2.94-7.625-6.655-2.293-6.605-5.537-11.818-12.485-14.161a21.621 21.621 0 00-18.277 2.343c-9.378 5.88-14.288 16.552-17.64 26.685-3.832 11.427-5.88 23.344-9.084 34.957-3.979 14.445-12.201 27.283-19.953 39.984-4.567 7.487-9.683 14.7-14.132 22.197-4.155 7.056-7.448 12.994-15.072 16.66-6.635 3.165-12.319 6.379-16.445 12.671a37.152 37.152 0 00-5.674 19.375c-.44 15.376 7.977 29.086 18.679 39.484 23.157 22.54 55.233 35.858 87.053 39.455a146.995 146.995 0 0024.5.617c5.802-.314 5.88-9.31 0-9.085a149.485 149.485 0 01-84.77-22.432c-12.014-7.526-24.264-16.954-31.193-29.606-6.007-10.966-7.301-26.871 2.46-36.26 4.665-4.478 11.397-5.801 16.523-9.662 5.125-3.862 8.31-9.683 11.485-15.141 8.105-13.936 17.366-27.117 25.167-41.258a121.253 121.253 0 0012.152-30.645c2.587-10.574 4.674-21.335 8.437-31.576 2.94-7.928 8.262-19.257 17.866-20.335 8.261-.931 10.055 5.214 12.622 11.447 2.254 5.478 6.782 10.231 13.024 10.535 6.478.304 12.74-3.812 18.856-5.4a53.975 53.975 0 0122.853-.735 91.403 91.403 0 0140.072 17.934c20.698 16.435 30.9 41.915 29.008 68.041-2.018 27.96-15.072 54.969-35.142 74.48-18.856 18.287-45.512 31.253-72.275 27.009-19.777-3.146-42.621-15.954-41.494-38.896a17.13 17.13 0 0110.251-15.386c2.46-1.049 2.215-4.41.774-6.066-7.32-8.458-12.74-21.325-7.84-32.34 3.969-8.879 14.377-14.406 23.638-10.545 3.587 1.499 5.88-3.734 3.587-6.154-4.792-4.959-5.478-13.544-.637-18.777 4.841-5.233 13.651-5.224 18.894-.706 2.352 2.029 7.37.137 5.88-3.42-4.763-11.427-4.204-34.643 14.22-27.44 5.547 2.166 9.918 6.586 14.259 10.515a95.452 95.452 0 0012.603 9.546c9.359 6.017 19.443 11.132 26.597 19.903 2.509 3.087 6.811-1.293 4.361-4.361l.039.049z"
      ></path>
      <path
        fill={color}
        d="M560.554 342.494a55.24 55.24 0 0160.902 48.932l2.79 25.593c3.305 30.33-18.602 57.597-48.932 60.903l-14.759-135.418-.001-.01z"
      ></path>
      <ellipse
        cx="568.173"
        cy="410.181"
        fill={color}
        rx="28.792"
        ry="68.12"
        transform="rotate(-6.22 568.173 410.181)"
      ></ellipse>
      <path
        fill="#232323"
        d="M547.659 388.402a5.85 5.85 0 015.183-6.45l16.289-1.775a5.85 5.85 0 111.267 11.632l-16.289 1.775a5.85 5.85 0 01-6.45-5.182z"
      ></path>
      <path
        fill="#232323"
        d="M570.384 389.956l-10.006 1.088a49.876 49.876 0 01-5.243.578c-.343 0-.696.127-1.039.108-4.302-.265-6.586-4.9-2.313-7.301 2.94-1.627 7.752-1.284 11.055-1.647a49.563 49.563 0 015.243-.568c.333 0 .695-.137 1.038-.118 5.557.343 6.037 6.733.765 7.928-2.372.539-1.372 4.185.98 3.646a7.742 7.742 0 00-1.764-15.347 99.92 99.92 0 00-16.543 1.803c-9.143 1.725-8.771 15.063.843 15.377 5.547.186 11.447-1.167 16.964-1.764 2.411-.265 2.44-4.048.02-3.783zM551.818 426.565a5.851 5.851 0 015.183-6.45l16.289-1.776a5.85 5.85 0 011.268 11.633l-16.289 1.775a5.852 5.852 0 01-6.451-5.182z"
      ></path>
      <path
        fill="#232323"
        d="M574.539 428.117l-10.006 1.088a49.847 49.847 0 01-5.243.578c-.343 0-.695.127-1.038.108-4.303-.255-6.586-4.9-2.313-7.301 2.94-1.627 7.752-1.284 11.054-1.647a49.62 49.62 0 015.243-.568c.343 0 .696-.137 1.039-.118 5.557.343 6.037 6.733.764 7.929-2.371.539-1.372 4.184.98 3.645a7.743 7.743 0 00-1.764-15.347c-5.554.145-11.087.748-16.542 1.804-9.143 1.734-8.761 15.062.843 15.376 5.547.186 11.446-1.166 16.964-1.764 2.41-.265 2.44-4.048.019-3.783z"
      ></path>
      <path
        fill={color}
        fillRule="evenodd"
        d="M170.034 927.104l28.332-.186c-.304-46.433 29.576-100.196 57.212-138.053a127.184 127.184 0 0046.492 17.797c18.463 2.999 36.475 1.107 52.096-5.488 18.513-7.801 34.114-23.961 41.748-43.228 6.713-16.974 6.694-34.721-.068-49.98-4.841-10.956-12.299-18.61-21.56-22.119-6.282-2.371-12.397-2.469-17.062-2.293-31.987 1.225-63.886 18.757-94.786 52.077-3.557 3.832-7.555 8.399-11.848 13.573a124.29 124.29 0 01-23.098-30.223c-19.826-36.426-19.022-78.596-14.857-107.565 3.92-27.577 11.848-51.273 23.52-70.442 10.799-17.718 22.491-35.897 35.77-50.137 13.279-14.239 35.789-31.066 51.371-34.3l-5.762-27.744c-25.872 5.4-53.851 29.342-66.297 42.64-14.916 15.945-27.695 35.741-39.278 54.753-13.72 22.452-22.923 49.794-27.44 81.154-6.851 47.628-.608 90.904 18.012 125.136a153.033 153.033 0 0030.527 39.151 463.17 463.17 0 00-25.48 38.788c-25.137 43.032-37.769 82.291-37.544 116.689zm159.897-148.362c-17.64 2.871-38.22-1.51-56.84-12.437 3.587-4.272 6.968-8.114 10.114-11.456 25.607-27.626 50.871-42.11 75.097-43.032.98-.039 4.214-.166 5.88.471 1.911.725 4.106 3.449 5.733 7.105 3.655 8.251 3.548 18.257-.372 28.057-4.851 12.338-14.769 22.658-26.411 27.558a57.813 57.813 0 01-13.201 3.734z"
        clipRule="evenodd"
      ></path>
      <path
        fill="#232323"
        d="M476.255 436.388l-49.51 10.967-3.038-13.72 47.373-10.496a4.33 4.33 0 013.734.98l2.754 2.313c3.469 3.008 2.646 9.074-1.313 9.956z"
      ></path>
      <path
        fill="#232323"
        d="M475.746 434.566l-49.5 10.966 2.323 1.313-3.038-13.72-1.314 2.323 27.921-6.184 15.925-3.528a15.512 15.512 0 013.42-.755c3.538.137 9.966 7.585 4.263 9.575-2.274.794-1.294 4.449.98 3.645 8.212-2.881 4.488-12.112-.98-15.68-4.116-2.675-9.879-.176-14.259.794l-38.308 8.487a1.96 1.96 0 00-1.314 2.323l3.029 13.72a1.959 1.959 0 002.332 1.323l49.529-10.908c2.372-.578 1.372-4.224-1.009-3.694zM460.8 399.06l-49.499 10.967-3.038-13.72 47.363-10.486a4.358 4.358 0 013.744.98l2.753 2.312c3.45 2.95 2.597 9.065-1.323 9.947z"
      ></path>
      <path
        fill="#232323"
        d="M460.291 397.237l-49.471 10.957 2.323 1.323-3.028-13.72-1.323 2.322 27.93-6.183 15.925-3.528a15.258 15.258 0 013.41-.755c3.548.137 9.967 7.575 4.273 9.575-2.283.793-1.303 4.449.98 3.635 8.212-2.871 4.498-12.103-.98-15.68-4.116-2.675-9.878-.176-14.259.794l-38.298 8.487a1.959 1.959 0 00-1.323 2.323l3.038 13.72a1.96 1.96 0 002.312 1.293l49.5-10.966c2.362-.48 1.362-4.126-1.009-3.597z"
      ></path>
      <path
        fill={color}
        d="M417.858 484.09l-51.189 11.339c-30.649 6.789-60.998-12.553-67.787-43.202-6.789-30.649 12.553-60.999 43.202-67.788l51.189-11.339 24.585 110.99z"
      ></path>
      <path
        fill={color}
        d="M433.948 422.502c-8.095-36.545-27.126-63.446-42.61-60.319l-10.016 2.214c-24.252 5.372-39.562 29.381-34.202 53.636l10.006 45.178a44.984 44.984 0 0053.694 34.192l10.016-2.225c15.317-3.714 21.207-36.132 13.112-72.676zM287.164 442.895c1.96.804 3.41 2.637 4.577 4.518a34.95 34.95 0 014.008 9.193c1.186 4.321 2.019 9.535 5.811 11.534a7.408 7.408 0 004.224.715c4.782-.47 8.82-4.419 10.427-9.231 1.607-4.812.98-10.3-.98-15.033-2.832-6.86-9.251-12.74-16.18-12.093a16.794 16.794 0 00-7.84 3.234c-1.675 1.176-3.381 2.851-3.322 5.007"
      ></path>
      <path
        fill="#232323"
        d="M551.941 123.68a20538.457 20538.457 0 01-17.964 74.48c-.5 2.039 2.666 2.94 3.136.872a44526.986 44526.986 0 0117.542-74.558c.422-1.764-2.293-2.519-2.714-.755v-.039zM574.059 185.146l2.568-3.852c1.078-1.617-1.529-3.116-2.597-1.519l-2.568 3.852c-1.078 1.617 1.529 3.126 2.597 1.519zM657.78 274.777c11.456-5.88 22.246-13.612 33.163-20.463 10.918-6.85 22.021-13.798 32.987-20.776 1.882-1.205.147-4.204-1.764-3.008-11.005 6.86-21.962 13.896-32.928 20.864-10.966 6.968-22.491 13.406-32.761 21.188a1.273 1.273 0 001.284 2.195h.019zM745.176 202.6l3.852-1.284c1.911-.637 1.088-3.695-.843-3.048l-3.851 1.284c-1.96.637-1.098 3.694.842 3.048zM288.164 158.372c28.018 28.881 55.742 58.045 83.947 86.75 1.695 1.715 4.331-.922 2.655-2.656-27.969-28.92-56.418-57.389-84.574-86.132-1.293-1.323-3.322.705-2.028 2.038zM328.882 153.982a1.687 1.687 0 000-3.362 1.686 1.686 0 000 3.362zM163.047 331.44a452.441 452.441 0 0079.841 6.86c2.342 0 2.342-3.646 0-3.636a460.759 460.759 0 01-79.106-5.88c-1.754-.294-2.509 2.391-.735 2.685v-.029zM241.614 290.937c4.684 3.92 9.33 7.84 14.132 11.534 1.636 1.284 3.998-.931 2.342-2.342-4.626-3.92-9.398-7.713-14.142-11.525-1.636-1.313-3.988.98-2.332 2.333zM303.099 673.735a192.275 192.275 0 0117.306-37.76c1.127-1.881-1.803-3.587-2.94-1.715a175.61 175.61 0 00-17.385 38.651c-.588 1.911 2.352 2.695 2.94.824h.079zM468.64 656.732c.833 20.962 1.49 41.934 2.44 62.896.098 2.107 3.372 2.127 3.293 0-.754-20.972-1.813-41.934-2.695-62.896-.078-1.96-3.116-1.96-3.038 0zM608.584 620.335a146.326 146.326 0 0020.776 22.138c1.617 1.382 3.979-.98 2.352-2.352a147.762 147.762 0 01-20.668-21.688c-1.088-1.391-3.557.49-2.47 1.902h.01zM619.463 403.764c3.626 17.219.157 33.614-6.39 49.637-1.519 3.724 4.714 6.331 6.498 2.744 8.241-16.533 8.82-35.995 4.958-53.782-.725-3.303-5.762-1.902-5.066 1.401zM617.894 391.024c3.969 0 3.969-6.164 0-6.164s-3.978 6.164 0 6.164zM679.967 414.613c20.58-.608 41.729-1.235 61.436 5.576 16.268 5.635 30.508 16.052 41.993 28.753 12.045 13.309 20.904 29.4 27.627 45.913 7.105 17.503 12.622 36.848 10.515 55.86-4.165 37.691-30.096 70.874-58.232 94.482-29.841 25.059-66.316 41.238-94.334 68.6-14.308 13.965-25.794 30.684-31.517 49.98a99.646 99.646 0 001.195 61.328c1.647 4.626 9.036 2.676 7.429-2.048a93.516 93.516 0 01-.108-58.663c5.772-17.992 17.199-33.32 30.792-46.167 29.204-27.676 66.904-44.179 97.02-70.766 28.008-24.696 52.165-58.702 56.242-96.736 2.028-18.904-3.126-38.279-9.986-55.742-6.566-16.719-15.024-32.723-26.529-46.59-12.25-14.778-27.93-26.979-45.933-33.859-21.56-8.232-45.031-7.212-67.62-5.88-3.802.216-3.861 6.067 0 5.959h.01zM585.339 373.492c4.9 17.64 9.623 36.427 9.114 54.88-.383 14.337-4.214 36.387-19.424 42.581-4.851 1.96-2.862 9.927 2.215 8.016 17.189-6.468 23.52-27.018 24.98-43.708 1.96-22.069-4.753-42.649-12.132-63.102-1.059-2.94-5.616-1.783-4.753 1.313v.02z"
      ></path>
      <path
        fill="#fff"
        d="M729.154 428.735c7.075-13.789 22.471-22.452 32.016-35.104 4.822-6.389 9.516-13.465 16.827-16.719 19.149-8.506 24.333 15.935 21.393 29.028 5.204-7.174 16.455-8.987 23.648-3.802 7.193 5.184 9.026 16.434 3.851 23.627 10.026-7.163 25.48-1.499 31.262 9.408 5.782 10.908 3.342 24.657-2.94 35.28 8.046 1.363 14.191 8.732 15.798 16.719 6.252 30.89-26.362 51.205-52.754 53.9-19.707 2.019-39.729-3.557-56.947-13.367-28.969-16.513-50.676-45.462-57.889-78.028"
      ></path>
      <path
        fill="#232323"
        d="M697.401 443.013a124.89 124.89 0 0038.563 71.766c26.245 24.264 65.66 39.484 100.744 26.607 13.603-4.989 26.794-13.642 34.114-26.46 7.409-13.005 8.301-32.595-3.724-43.297a22.746 22.746 0 00-10.78-5.478l2.666 6.546c7.556-13.063 10.29-31.007.176-43.561-7.928-9.8-23.383-14.298-34.3-6.713l5.341 5.332c6.066-9.193 3.724-22.491-5.321-28.861-9.202-6.488-22.168-3.391-28.734 5.203l6.743 2.842c2.42-11.524.323-30.017-12.74-34.496-7.84-2.704-16.494 1.823-22.021 7.194-3.567 3.469-6.409 7.585-9.369 11.554a86.541 86.541 0 01-10.143 11.044c-8.095 7.664-16.983 14.906-22.236 24.961-1.833 3.508 3.45 6.615 5.331 3.107 4.087-7.635 10.486-13.466 16.846-19.208a135.968 135.968 0 0017.827-18.895c4.488-5.88 10.231-13.102 18.306-13.553 5.106-.275 8.281 3.753 9.908 8.153a33.404 33.404 0 011.244 18.13c-.705 3.225 3.715 6.743 6.155 3.587 4.302-5.556 12.808-7.722 18.786-3.391 5.978 4.332 6.713 12.907 2.744 18.62-2.214 3.195 2.147 7.448 5.332 5.332 7.918-5.263 18.845-1.598 24.127 5.801 7.017 9.8 3.92 23.589-1.646 33.242-1.362 2.332-.206 5.978 2.656 6.536 14.7 2.94 15.631 22.276 10.27 33.32-5.586 11.623-17.072 19.689-28.861 24.206-31.948 12.241-67.953-1.176-92.12-23.333a115.878 115.878 0 01-36.691-68.894"
      ></path>
      <path
        fill="#232323"
        d="M773.42 432.194l5.439-1.833a2.773 2.773 0 001.891-3.322 2.734 2.734 0 00-3.322-1.891l-5.459 1.813a2.773 2.773 0 00-1.891 3.342 2.744 2.744 0 003.342 1.891zM800.291 466.827c1.225-.794 2.46-1.568 3.617-2.45a3.347 3.347 0 001.43-1.862 3.106 3.106 0 00-4.566-3.508c-1.265.735-2.45 1.568-3.656 2.391a3.148 3.148 0 00-.016 5.502c.998.557 2.22.529 3.191-.073zM824.507 501.323a35.39 35.39 0 017.125-2.715c3.214-.921 2.763-6.37-.823-6.056a21.74 21.74 0 00-9.536 3.244c-3.528 2.146-.392 7.507 3.234 5.527zM808.191 382.341a48.28 48.28 0 013.449-26.548c1.96-4.439-4.194-8.379-6.674-3.92a38.022 38.022 0 00-2.371 31.203c1.029 2.725 6.017 2.666 5.566-.754l.03.019z"
      ></path>
      <path
        fill="#fff"
        d="M267.564 546.06c-9.506-12.24-26.234-17.894-37.965-28.567-5.88-5.39-11.838-11.475-19.6-13.318-20.394-4.821-20.962 20.159-15.68 32.477-6.439-6.085-17.826-5.791-23.941.637-6.116 6.429-5.822 17.817.588 23.942-11.182-5.194-25.343 3.244-28.979 15.023-3.636 11.78 1.274 24.853 9.437 34.094-7.653 2.823-12.328 11.202-12.436 19.355-.431 31.507 35.378 45.443 61.819 43.218 19.747-1.656 38.386-10.838 53.488-23.667 25.411-21.56 41.395-54.056 42.454-87.386"
      ></path>
      <path
        fill="#232323"
        d="M301.413 554.224a124.917 124.917 0 01-24.627 77.674c-21.305 28.695-57.242 50.96-94.08 44.777-14.289-2.392-28.861-8.458-38.426-19.718-9.565-11.26-14.19-30.498-4.351-43.228a22.702 22.702 0 019.535-7.379l-1.411 6.928c-9.849-11.436-15.847-28.567-8.222-42.767 5.968-11.123 20.325-18.385 32.448-12.946l-4.263 6.233c-7.664-7.918-7.84-21.423-.108-29.4s21.158-7.438 29.194-.196l-6.096 4.038c-4.508-10.878-5.88-29.4 6.096-36.26 7.223-4.106 16.542-1.264 22.971 2.999 4.146 2.744 7.703 6.272 11.349 9.623a87.317 87.317 0 0012.005 8.977c9.378 6.027 19.443 11.495 26.46 20.413 2.45 3.107-2.166 7.145-4.665 4.038-5.429-6.742-12.799-11.299-20.11-15.768a135.629 135.629 0 01-20.903-15.239c-5.498-4.988-12.476-10.986-20.492-9.928-5.067.667-7.448 5.224-8.222 9.849a33.322 33.322 0 002.126 18.042c1.284 3.038-2.41 7.311-5.39 4.665-5.252-4.665-14.014-5.223-19.09.147-5.076 5.37-4.204 13.916.755 18.826 2.773 2.734-.735 7.712-4.254 6.233-8.761-3.705-18.816 1.96-22.638 10.152-5.076 10.947.461 23.922 7.772 32.34 1.764 2.039 1.303 5.88-1.411 6.919-13.877 5.576-11.231 24.775-3.92 34.624 7.683 10.339 20.413 16.15 32.83 18.414 33.663 6.115 66.571-13.72 86.24-39.974a115.908 115.908 0 0023.314-74.48"
      ></path>
      <path
        fill="#232323"
        d="M186.832 515.338a38.4 38.4 0 00-8.203-30.959c-2.783-3.361-8.506 1.049-6.066 4.695a48.368 48.368 0 018.702 25.48c.157 2.998 4.979 4.067 5.567.754v.03zM388.78 412.918c3.861 13.22 4.537 28.057 2.94 41.699-1.431 11.926-4.175 28.469-13.72 36.799-3.068 2.685 1.097 8.251 4.419 5.733 10.937-8.35 14.22-25.324 15.906-38.22 2.136-16.357.059-31.703-4.714-47.364-.98-3.087-5.753-1.783-4.841 1.333l.01.02zM378.128 396.728l3.39 4.292c1.088 1.382 3.607 1.225 4.734 0a3.45 3.45 0 000-4.733l-3.411-4.312c-1.087-1.372-3.596-1.215-4.713 0a3.45 3.45 0 000 4.724v.029zM951.241 487.084c9.055 4.106 11.672 14.7 9.702 23.755-2.156 9.957-8.026 19.208-13.72 27.538-11.339 16.66-26.147 30.312-42.924 41.327-4.371 2.871-.441 9.8 4.126 7.066a144.986 144.986 0 0049.911-50.196c5.958-9.957 11.956-21.462 10.917-33.438-.833-9.545-6.595-18.188-15.866-21.197-2.94-.98-5.106 3.822-2.166 5.145h.02zM217.447 548.609c2.832 1.813 6.341 2.94 9.457 4.204 3.116 1.264 5.312-3.92 2.303-5.449-3.009-1.529-6.243-3.273-9.486-4.155-3.244-.882-5.067 3.606-2.274 5.4zM202.923 588.269c2.098.431 4.185.882 6.302 1.215a3.174 3.174 0 003.792-2.156 3.106 3.106 0 00-2.146-3.792c-2.087-.51-4.184-.902-6.282-1.304a3.214 3.214 0 00-3.851 2.186 3.155 3.155 0 002.185 3.851zM183.617 639.925h3.763a3.09 3.09 0 002.818-4.676 3.087 3.087 0 00-2.818-1.488h-3.773a3.077 3.077 0 000 6.144l.01.02zM39.802 654.37c-9.212 7.663-10.839 21.021-6.958 31.889 4.9 13.72 17.287 22.54 29.145 29.88 27.44 17.072 58.526 34.388 92.003 26.95 5.556-1.235 3.185-9.653-2.352-8.506-28.626 5.88-55.655-8.036-79.44-22.334-10.642-6.39-22.598-12.897-29.497-23.609-5.812-9.016-6.86-22.089 1.48-29.89 2.94-2.753-1.363-6.86-4.381-4.38zM248.905 527.441c-.265-6.694 5.351-12.74 9.045-17.846 3.695-5.106 7.723-10.574 12.025-15.474 8.222-9.369 17.885-17.386 29.939-21.149 4.9-1.529 2.822-9.222-2.127-7.712-13.906 4.243-25.049 13.533-34.3 24.5a195.187 195.187 0 00-12.74 17.336c-4.067 6.115-9.163 12.554-8.261 20.315.47 3.999 6.605 4.224 6.438 0l-.019.03z"
      ></path>
      <path
        fill="#232323"
        d="M295.974 451.304a49.345 49.345 0 012.509 13.799c.166 3.92 6.252 3.92 6.144 0a48.659 48.659 0 00-2.999-15.357c-1.274-3.508-6.86-2.048-5.654 1.558zM209.92 678.645c.618 7.928 4.989 16.277 7.938 23.588 2.95 7.311 5.998 14.328 9.33 21.335 5.165 10.839 11.985 22.54 24.373 25.813 4.174 1.117 5.507-4.743 1.734-6.292-11.162-4.576-16.797-16.14-21.726-26.391a419.817 419.817 0 01-8.82-19.669c-2.607-6.33-4.312-13.974-8.095-19.678-1.294-1.96-4.998-1.421-4.783 1.294h.049zM272.748 769.138c13.357 8.447 29.978 10.78 45.53 10.339 14.994-.412 30.106-4.822 41.425-14.975 10.564-9.466 16.307-23.97 13.406-38.063-1.372-6.654-4.811-13.965-11.76-16.131-7.095-2.224-15.092-.245-21.912 1.96-52.176 17.356-85.633 64.092-110.554 110.544-16.533 30.821-29.743 63.965-33.859 98.882-.451 3.852 6.193 4.783 6.811.922 8.026-50.088 31.301-97.501 60.319-138.71 13.318-18.923 28.949-36.113 48.431-48.862 11.172-7.311 23.697-13.72 36.75-16.886 3.656-.872 8.321-1.725 11.956-.323 3.636 1.401 5.302 6.331 6.125 9.927a30.91 30.91 0 01-2.616 20.365c-6.86 13.72-21.942 21.079-36.554 23.177-16.298 2.332-35.868.852-50.431-7.341-3.381-1.901-6.282 3.117-3.028 5.175h-.039zM768.569 708.74a127.005 127.005 0 0061.525-38.22c1.656-1.852-1.078-4.606-2.744-2.744a127.491 127.491 0 01-59.682 37.681 1.685 1.685 0 00.901 3.244v.039zM806.182 719.687l9.379-7.026c1.744-1.314 0-4.312-1.745-2.94l-9.349 7.036c-1.754 1.313 0 4.312 1.744 2.94l-.029-.01z"
      ></path>
      <path
        fill="#232323"
        d="M288.154 839.081a69.823 69.823 0 0045.795-4.538c2.136-.98.274-4.135-1.852-3.155a67.7 67.7 0 01-43.12 4.684c-1.96-.431-2.783 2.538-.823 3.009zM304.98 871.989a28.13 28.13 0 0019.816-7.536c1.431-1.323-.647-3.313-2.107-2.107a27.108 27.108 0 01-17.709 6.291c-2.156 0-2.156 3.322 0 3.352z"
      ></path>
    </svg>
  );
}