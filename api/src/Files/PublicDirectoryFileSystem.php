<?php

declare(strict_types=1);

namespace App\Files;

use public\PublicPath;

class PublicDirectoryFileSystem extends CustomFilesystem
{
    public function __construct()
    {
        parent::__construct(new LocalFileSystemAdapter(
            PublicPath::ABSOLUTE_PATH,
        ));
    }
}
