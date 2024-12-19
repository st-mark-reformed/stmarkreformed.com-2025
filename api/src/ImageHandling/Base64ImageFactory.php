<?php

declare(strict_types=1);

namespace App\ImageHandling;

use Melihovv\Base64ImageDecoder\Base64ImageDecoder;
use Melihovv\Base64ImageDecoder\Exceptions\InvalidFormat;
use Melihovv\Base64ImageDecoder\Exceptions\NotBase64Encoding;

readonly class Base64ImageFactory
{
    /**
     * @param string[] $allowedFormats
     *
     * @throws NotBase64Encoding|InvalidFormat
     */
    public function createFromDataUri(
        string $base64EncodedImage,
        array $allowedFormats = ['jpeg', 'png'],
    ): Base64Image {
        return new Base64Image(new Base64ImageDecoder(
            $base64EncodedImage,
            $allowedFormats,
        ));
    }
}
