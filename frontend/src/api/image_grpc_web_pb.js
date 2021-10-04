/**
 * @fileoverview gRPC-Web generated client stub for images
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.images = require('./image_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.images.ImageClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.images.ImagePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.images.ImageRequest,
 *   !proto.images.ImageResponse>}
 */
const methodDescriptor_Image_GetImagesStream = new grpc.web.MethodDescriptor(
  '/images.Image/GetImagesStream',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.images.ImageRequest,
  proto.images.ImageResponse,
  /**
   * @param {!proto.images.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.images.ImageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.images.ImageRequest,
 *   !proto.images.ImageResponse>}
 */
const methodInfo_Image_GetImagesStream = new grpc.web.AbstractClientBase.MethodInfo(
  proto.images.ImageResponse,
  /**
   * @param {!proto.images.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.images.ImageResponse.deserializeBinary
);


/**
 * @param {!proto.images.ImageRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.images.ImageResponse>}
 *     The XHR Node Readable Stream
 */
proto.images.ImageClient.prototype.getImagesStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/images.Image/GetImagesStream',
      request,
      metadata || {},
      methodDescriptor_Image_GetImagesStream);
};


/**
 * @param {!proto.images.ImageRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.images.ImageResponse>}
 *     The XHR Node Readable Stream
 */
proto.images.ImagePromiseClient.prototype.getImagesStream =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/images.Image/GetImagesStream',
      request,
      metadata || {},
      methodDescriptor_Image_GetImagesStream);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.images.ImageRequest,
 *   !proto.images.ImageResponse>}
 */
const methodDescriptor_Image_GetImageUnary = new grpc.web.MethodDescriptor(
  '/images.Image/GetImageUnary',
  grpc.web.MethodType.UNARY,
  proto.images.ImageRequest,
  proto.images.ImageResponse,
  /**
   * @param {!proto.images.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.images.ImageResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.images.ImageRequest,
 *   !proto.images.ImageResponse>}
 */
const methodInfo_Image_GetImageUnary = new grpc.web.AbstractClientBase.MethodInfo(
  proto.images.ImageResponse,
  /**
   * @param {!proto.images.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.images.ImageResponse.deserializeBinary
);


/**
 * @param {!proto.images.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.images.ImageResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.images.ImageResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.images.ImageClient.prototype.getImageUnary =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/images.Image/GetImageUnary',
      request,
      metadata || {},
      methodDescriptor_Image_GetImageUnary,
      callback);
};


/**
 * @param {!proto.images.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.images.ImageResponse>}
 *     Promise that resolves to the response
 */
proto.images.ImagePromiseClient.prototype.getImageUnary =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/images.Image/GetImageUnary',
      request,
      metadata || {},
      methodDescriptor_Image_GetImageUnary);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.images.ImageRequest,
 *   !proto.images.ImagesResponse>}
 */
const methodDescriptor_Image_GetImagesUnary = new grpc.web.MethodDescriptor(
  '/images.Image/GetImagesUnary',
  grpc.web.MethodType.UNARY,
  proto.images.ImageRequest,
  proto.images.ImagesResponse,
  /**
   * @param {!proto.images.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.images.ImagesResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.images.ImageRequest,
 *   !proto.images.ImagesResponse>}
 */
const methodInfo_Image_GetImagesUnary = new grpc.web.AbstractClientBase.MethodInfo(
  proto.images.ImagesResponse,
  /**
   * @param {!proto.images.ImageRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.images.ImagesResponse.deserializeBinary
);


/**
 * @param {!proto.images.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.images.ImagesResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.images.ImagesResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.images.ImageClient.prototype.getImagesUnary =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/images.Image/GetImagesUnary',
      request,
      metadata || {},
      methodDescriptor_Image_GetImagesUnary,
      callback);
};


/**
 * @param {!proto.images.ImageRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.images.ImagesResponse>}
 *     Promise that resolves to the response
 */
proto.images.ImagePromiseClient.prototype.getImagesUnary =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/images.Image/GetImagesUnary',
      request,
      metadata || {},
      methodDescriptor_Image_GetImagesUnary);
};


module.exports = proto.images;

