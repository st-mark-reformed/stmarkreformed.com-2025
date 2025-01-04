<?php

declare(strict_types=1);

namespace App\ImageHandling\Resizing\Internal;

use App\Files\PublicDirectoryFileSystem;
use App\Files\RemoteSplFileInfo;
use Hyperf\Guzzle\ClientFactory;
use SplFileInfo;
use Throwable;

use function ltrim;

class SourceFileRetriever
{
    public function __construct(
        private readonly ClientFactory $guzzleClientFactory,
        private readonly PublicDirectoryFileSystem $fileSystem,
    ) {
    }

    /** @var SplFileInfo[] */
    private array $runtimeCache = [];

    public function retrieveInfo(string $pathOrUrl): SplFileInfo
    {
        try {
            if (isset($this->runtimeCache[$pathOrUrl])) {
                return $this->runtimeCache[$pathOrUrl];
            }

            $this->runtimeCache[$pathOrUrl] = $this->tryRetrieveInfo(
                pathOrUrl: $pathOrUrl,
            );

            return $this->runtimeCache[$pathOrUrl];
        } catch (Throwable) {
            return new SplFileInfo('');
        }
    }

    private function tryRetrieveInfo(string $pathOrUrl): SplFileInfo
    {
        if ($this->fileSystem->has($pathOrUrl)) {
            $path = ltrim($pathOrUrl, '/');

            return new SplFileInfo(
                $this->fileSystem->adapter->prefixer->prefixPath(
                    $path,
                ),
            );
        }

        $requestResponse = $this->guzzleClientFactory->create()->get(
            $pathOrUrl,
        );

        $body = $requestResponse->getBody();

        return new RemoteSplFileInfo(
            filename: $pathOrUrl,
            size: (int) $body->getSize(),
            content: (string) $body,
        );
    }
}
