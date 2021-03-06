/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow
 * @format
 */

export type TunnelHost = {
  host: string,
  port: number,
  family: 4 | 6,
};

export type TunnelDescriptor = {
  from: TunnelHost,
  to: TunnelHost,
};

export type SocketEvent =
  | {type: 'server_started'}
  | {
      type: 'client_connected',
      clientPort: number,
    }
  | {type: 'client_disconnected', clientPort: number};

export interface IRemoteSocket {
  write(msg: Buffer): void;
  dispose(): void;
}
