//
// Copyright (C) 2016-present Instructure, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/* @flow */

import mapStateToProps from '../map-state-to-props'

const template = {
  ...require('../../../../__templates__/course'),
  ...require('../../../../__templates__/tab'),
  ...require('../../../../redux/__templates__/app-state'),
}

test('mapStateToProps returns the correct props', () => {
  const course = template.course({ id: 1 })
  const tabs = { tabs: [template.tab()], pending: 0 }
  const attendanceTool = { pending: 0 }
  const state = template.appState({
    entities: {
      courses: {
        '1': {
          course,
          color: '#fff',
          tabs,
          attendanceTool,
        },
      },
    },
    favoriteCourses: {
      pending: 0,
      courseRefs: ['1'],
    },
  })
  const expected = {
    course,
    tabs: tabs.tabs,
    color: '#fff',
    pending: 0,
    error: undefined,
  }

  const props = mapStateToProps(state, { courseID: '1' })

  expect(props).toEqual(expected)
})

test('mapStateToProps returns basic props without course', () => {
  const state: { [string]: any } = {
    entities: {
      courses: {},
    },
    favoriteCourses: {},
  }

  expect(
    mapStateToProps(state, { courseID: '1' })
  ).toEqual({
    pending: 0,
    tabs: [],
    course: null,
    color: '',
    attendanceTabID: null,
  })
})

test('mapStateToProps hides attendance tab if it is hidden', () => {
  const course = template.course({ id: '1' })
  const tabs = { tabs: [template.tab({ id: '1', hidden: true })], pending: 0 }
  const attendanceTool = { tabID: '1', pending: 0 }
  const state = template.appState({
    entities: {
      courses: {
        '1': {
          course,
          color: '#fff',
          tabs,
          attendanceTool,
        },
      },
    },
    favoriteCourses: {
      pending: 0,
      courseRefs: ['1'],
    },
  })
  const expected = {
    course,
    tabs: [],
    color: '#fff',
    pending: 0,
    error: undefined,
    attendanceTabID: '1',
  }

  const props = mapStateToProps(state, { courseID: '1' })

  expect(props).toEqual(expected)
})
