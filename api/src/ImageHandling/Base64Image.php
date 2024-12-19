<?php

declare(strict_types=1);

namespace App\ImageHandling;

use Melihovv\Base64ImageDecoder\Base64ImageDecoder;

use function mb_strtolower;

readonly class Base64Image
{
    public function __construct(private Base64ImageDecoder $base64ImageFactory)
    {
    }

    public function getFormat(): string
    {
        return $this->base64ImageFactory->getFormat();
    }

    public function getContent(): string
    {
        return $this->base64ImageFactory->getContent();
    }

    public function getDecodedContent(): string
    {
        return $this->base64ImageFactory->getDecodedContent();
    }

    public function getFileExtension(): string
    {
        $format = mb_strtolower($this->getFormat());

        if ($format === 'jpeg') {
            $format = 'jpg';
        }

        return $format;
    }

    public function createFilename(string $baseName): string
    {
        return $baseName . '.' . $this->getFileExtension();
    }
}
