"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.tsx":
/*!**********************!*\
  !*** ./app/page.tsx ***!
  \**********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\nfunction Home() {\n    _s();\n    const [establishments, setEstablishments] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selectedEstablishment, setSelectedEstablishment] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [courses, setCourses] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selectedCourse, setSelectedCourse] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [quizzes, setQuizzes] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [selectedQuiz, setSelectedQuiz] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        fetchEstablishments();\n    }, []);\n    const fetchEstablishments = async ()=>{\n        const response = await fetch(\"/api/establishments\");\n        const data = await response.json();\n        setEstablishments(data);\n    };\n    const fetchCourses = async (establishmentId)=>{\n        const response = await fetch(\"/api/courses?establishmentId=\".concat(establishmentId));\n        const data = await response.json();\n        setCourses(data);\n    };\n    const fetchQuizzes = async (courseId)=>{\n        const response = await fetch(\"/api/quizzes?courseId=\".concat(courseId));\n        const data = await response.json();\n        setQuizzes(data);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"min-h-screen p-8\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                className: \"text-2xl font-bold mb-8\",\n                children: \"Revision Helper\"\n            }, void 0, false, {\n                fileName: \"/home/project/app/page.tsx\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"space-y-4\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                        value: selectedEstablishment,\n                        onChange: (e)=>{\n                            setSelectedEstablishment(e.target.value);\n                            fetchCourses(e.target.value);\n                        },\n                        className: \"p-2 border rounded\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                value: \"\",\n                                children: \"Select Establishment\"\n                            }, void 0, false, {\n                                fileName: \"/home/project/app/page.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 11\n                            }, this),\n                            establishments.map((est)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                    value: est.id,\n                                    children: est.name\n                                }, est.id, false, {\n                                    fileName: \"/home/project/app/page.tsx\",\n                                    lineNumber: 50,\n                                    columnNumber: 13\n                                }, this))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/project/app/page.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                        value: selectedCourse,\n                        onChange: (e)=>{\n                            setSelectedCourse(e.target.value);\n                            fetchQuizzes(e.target.value);\n                        },\n                        className: \"p-2 border rounded\",\n                        disabled: !selectedEstablishment,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                value: \"\",\n                                children: \"Select Course\"\n                            }, void 0, false, {\n                                fileName: \"/home/project/app/page.tsx\",\n                                lineNumber: 63,\n                                columnNumber: 11\n                            }, this),\n                            courses.map((course)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                    value: course.id,\n                                    children: course.name\n                                }, course.id, false, {\n                                    fileName: \"/home/project/app/page.tsx\",\n                                    lineNumber: 65,\n                                    columnNumber: 13\n                                }, this))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/project/app/page.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                        value: selectedQuiz,\n                        onChange: (e)=>setSelectedQuiz(e.target.value),\n                        className: \"p-2 border rounded\",\n                        disabled: !selectedCourse,\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                value: \"\",\n                                children: \"Select Quiz\"\n                            }, void 0, false, {\n                                fileName: \"/home/project/app/page.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 11\n                            }, this),\n                            quizzes.map((quiz)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                    value: quiz.id,\n                                    children: quiz.name\n                                }, quiz.id, false, {\n                                    fileName: \"/home/project/app/page.tsx\",\n                                    lineNumber: 77,\n                                    columnNumber: 13\n                                }, this))\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/home/project/app/page.tsx\",\n                        lineNumber: 69,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/home/project/app/page.tsx\",\n                lineNumber: 39,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/home/project/app/page.tsx\",\n        lineNumber: 36,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"owxKUSFsE6G83mz8/WBudcT5FiY=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YWNrOi8vX05fRS8uL2FwcC9wYWdlLnRzeD83NjAzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50JztcblxuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgW2VzdGFibGlzaG1lbnRzLCBzZXRFc3RhYmxpc2htZW50c10gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtzZWxlY3RlZEVzdGFibGlzaG1lbnQsIHNldFNlbGVjdGVkRXN0YWJsaXNobWVudF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjb3Vyc2VzLCBzZXRDb3Vyc2VzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlbGVjdGVkQ291cnNlLCBzZXRTZWxlY3RlZENvdXJzZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtxdWl6emVzLCBzZXRRdWl6emVzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3QgW3NlbGVjdGVkUXVpeiwgc2V0U2VsZWN0ZWRRdWl6XSA9IHVzZVN0YXRlKCcnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoRXN0YWJsaXNobWVudHMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGZldGNoRXN0YWJsaXNobWVudHMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9lc3RhYmxpc2htZW50cycpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgc2V0RXN0YWJsaXNobWVudHMoZGF0YSk7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hDb3Vyc2VzID0gYXN5bmMgKGVzdGFibGlzaG1lbnRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9jb3Vyc2VzP2VzdGFibGlzaG1lbnRJZD0ke2VzdGFibGlzaG1lbnRJZH1gKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHNldENvdXJzZXMoZGF0YSk7XG4gIH07XG5cbiAgY29uc3QgZmV0Y2hRdWl6emVzID0gYXN5bmMgKGNvdXJzZUlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL3F1aXp6ZXM/Y291cnNlSWQ9JHtjb3Vyc2VJZH1gKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHNldFF1aXp6ZXMoZGF0YSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8bWFpbiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gcC04XCI+XG4gICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIG1iLThcIj5SZXZpc2lvbiBIZWxwZXI8L2gxPlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkRXN0YWJsaXNobWVudH1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgIHNldFNlbGVjdGVkRXN0YWJsaXNobWVudChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICBmZXRjaENvdXJzZXMoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgY2xhc3NOYW1lPVwicC0yIGJvcmRlciByb3VuZGVkXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgRXN0YWJsaXNobWVudDwvb3B0aW9uPlxuICAgICAgICAgIHtlc3RhYmxpc2htZW50cy5tYXAoKGVzdCkgPT4gKFxuICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2VzdC5pZH0gdmFsdWU9e2VzdC5pZH0+e2VzdC5uYW1lfTwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ291cnNlfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgc2V0U2VsZWN0ZWRDb3Vyc2UoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgZmV0Y2hRdWl6emVzKGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiBib3JkZXIgcm91bmRlZFwiXG4gICAgICAgICAgZGlzYWJsZWQ9eyFzZWxlY3RlZEVzdGFibGlzaG1lbnR9XG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IENvdXJzZTwvb3B0aW9uPlxuICAgICAgICAgIHtjb3Vyc2VzLm1hcCgoY291cnNlKSA9PiAoXG4gICAgICAgICAgICA8b3B0aW9uIGtleT17Y291cnNlLmlkfSB2YWx1ZT17Y291cnNlLmlkfT57Y291cnNlLm5hbWV9PC9vcHRpb24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuXG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRRdWl6fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRRdWl6KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgYm9yZGVyIHJvdW5kZWRcIlxuICAgICAgICAgIGRpc2FibGVkPXshc2VsZWN0ZWRDb3Vyc2V9XG4gICAgICAgID5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IFF1aXo8L29wdGlvbj5cbiAgICAgICAgICB7cXVpenplcy5tYXAoKHF1aXopID0+IChcbiAgICAgICAgICAgIDxvcHRpb24ga2V5PXtxdWl6LmlkfSB2YWx1ZT17cXVpei5pZH0+e3F1aXoubmFtZX08L29wdGlvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJIb21lIiwiZXN0YWJsaXNobWVudHMiLCJzZXRFc3RhYmxpc2htZW50cyIsInNlbGVjdGVkRXN0YWJsaXNobWVudCIsInNldFNlbGVjdGVkRXN0YWJsaXNobWVudCIsImNvdXJzZXMiLCJzZXRDb3Vyc2VzIiwic2VsZWN0ZWRDb3Vyc2UiLCJzZXRTZWxlY3RlZENvdXJzZSIsInF1aXp6ZXMiLCJzZXRRdWl6emVzIiwic2VsZWN0ZWRRdWl6Iiwic2V0U2VsZWN0ZWRRdWl6IiwiZmV0Y2hFc3RhYmxpc2htZW50cyIsInJlc3BvbnNlIiwiZmV0Y2giLCJkYXRhIiwianNvbiIsImZldGNoQ291cnNlcyIsImVzdGFibGlzaG1lbnRJZCIsImZldGNoUXVpenplcyIsImNvdXJzZUlkIiwibWFpbiIsImNsYXNzTmFtZSIsImgxIiwiZGl2Iiwic2VsZWN0IiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJvcHRpb24iLCJtYXAiLCJlc3QiLCJpZCIsIm5hbWUiLCJkaXNhYmxlZCIsImNvdXJzZSIsInF1aXoiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.tsx\n"));

/***/ })

});