import First from "../pages/First";
import Second from "../pages/Second";
import {roles} from "./constants";


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: "Home",
    path: "home",
    element: (...props)=><First {...props}/>,
    pageable: {
      show: true,
      fetchLink: 'user/all',
      filter: {
        from: null,
        to: null,
      },
      sort: {
        desc: false,
        options: [
          {name: 'Yaratilgan vaqt', value: 'createdAt'},
          {name: 'Yangilangan vaqt', value: 'updatedAt'},
          {name: 'Ism bo\'yicha', value: 'name'},
        ]
      }
    },
    roles: [roles.admin, roles.director]
  },
  {
    name: "Second",
    path: "second",
    element: (props)=><Second {...props}/>,
    roles: [roles.admin, roles.director]
  },
]
