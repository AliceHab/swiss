/* eslint-disable no-undef */

type ApiConfig = {
  url: string
  headers?: HeadersInit
}

type GetT = {
  path: string
  config?: RequestInit
}

type PostT<T> = GetT & { body?: T }
type PatchT<T> = GetT & { body?: T }
type PutT<T> = GetT & { body?: T }
type DelT = GetT

export const apiConfig: ApiConfig = {
  url: 'https://reqres.in/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}

async function http<T>(
  path: string,
  configInit: RequestInit
): Promise<{ data: T; status: number }> {
  const url = `${apiConfig.url}${path}`

  const config: RequestInit = {
    ...configInit,
    headers: {
      ...apiConfig.headers,
      ...configInit.headers,
    },
  }

  const response = await fetch(url, config)
  const data = await response.json().catch(() => ({}))

  return { data, status: response.status }
}

export async function get<T>({ path, config }: GetT) {
  const init = { method: 'GET', ...config }
  const { data, status } = await http<T>(path, init)

  return { status, data }
}

export async function post<T, U>({ path, body, config }: PostT<T>) {
  const init: RequestInit = {
    method: 'POST',
    ...config,
  }

  if (body !== undefined) {
    init.body = JSON.stringify(body)
  }

  const { data, status } = await http<U>(path, init)

  return { status, data }
}

export async function patch<T, U>({ path, body, config }: PatchT<T>) {
  const init: RequestInit = {
    method: 'PATCH',
    ...config,
  }

  if (body !== undefined) {
    init.body = JSON.stringify(body)
  }

  const { data, status } = await http<U>(path, init)

  return { status, data }
}

export async function put<T, U>({ path, body, config }: PutT<T>) {
  const init: RequestInit = {
    method: 'PUT',
    ...config,
  }

  if (body !== undefined) {
    init.body = JSON.stringify(body)
  }

  const { data, status } = await http<U>(path, init)

  return { status, data }
}

export async function del<T>({ path, config }: DelT) {
  const init: RequestInit = { method: 'DELETE', ...config }
  const { data, status } = await http<T>(path, init)

  return { status, data }
}
